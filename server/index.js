require("dotenv").config();
const express = require("express");
const { initializeApp, cert, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");
const { mkdir, writeFile } = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");

const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:3000";
const sessionTtlHours = Number(process.env.SESSION_TTL_HOURS || 12);
const sessionSecret = process.env.SESSION_SECRET;
const adminUsername = process.env.ADMIN_USERNAME || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const uploadDir = path.join(__dirname, "uploads");

if (!sessionSecret) {
  console.error("SESSION_SECRET nao configurado. Defina essa variavel antes de subir o servidor.");
  process.exit(1);
}

const firebaseAppOptions = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? { credential: cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)) }
  : { credential: applicationDefault() };

initializeApp({ ...firebaseAppOptions, projectId: process.env.GCLOUD_PROJECT || "bd-indicada" });
const db = getFirestore();

const allowedUploadTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const fileSignatures = [
  { mimeType: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mimeType: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
  { mimeType: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

const matchesSignature = (buffer, mimeType) => {
  const signature = fileSignatures.find((item) => item.mimeType === mimeType);
  if (!signature) {
    return false;
  }
  return signature.bytes.every((byte, index) => buffer[index] === byte);
};

const normalizeSlug = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeUploadName = (filename) => {
  const parsed = path.parse(String(filename || "produto"));
  return normalizeSlug(parsed.name || "produto");
};

const hashPassword = (password, salt = randomBytes(16).toString("hex")) => {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
};

const verifyPassword = (password, salt, hash) => {
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
};

const loginAttempts = new Map();
const MAX_LOGIN_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

const isRateLimited = (ip) => {
  const entry = loginAttempts.get(ip);
  if (!entry) {
    return false;
  }
  if (Date.now() - entry.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_LOGIN_ATTEMPTS;
};

const registerFailedAttempt = (ip) => {
  const entry = loginAttempts.get(ip);
  if (!entry || Date.now() - entry.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: Date.now() });
    return;
  }
  entry.count += 1;
};

const clearFailedAttempts = (ip) => loginAttempts.delete(ip);

const ensureBootstrapUser = async () => {
  if (!adminUsername || !adminPassword) {
    return;
  }
  const existing = await db.collection("usuarios").limit(1).get();
  if (!existing.empty) {
    return;
  }
  const { salt, hash } = hashPassword(adminPassword);
  await db.collection("usuarios").doc(adminUsername).set({
    username: adminUsername,
    salt,
    hash,
    createdAt: new Date().toISOString(),
  });
};

const sessionFromRequest = (req) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return null;
  }
  try {
    const payload = jwt.verify(token, sessionSecret);
    return { username: payload.username };
  } catch (error) {
    return null;
  }
};

const requireAdmin = (req, res, next) => {
  const session = sessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Faca login para administrar o conteudo." });
    return;
  }
  req.session = session;
  next();
};

const sanitizeProduct = (body) => {
  const nome = String(body.nome || "").trim();
  const linha = String(body.linha || "").trim();
  const perfil = String(body.perfil || "").trim();
  const imagem = String(body.imagem || "").trim();
  const id = normalizeSlug(body.id || nome);
  const status = ["publicado", "rascunho", "oculto", "lancamento", "fora-de-linha"].includes(body.status)
    ? body.status
    : "publicado";

  if (!id || !nome || !linha || !perfil || !imagem) {
    return { error: "Preencha id, nome, linha, perfil e imagem." };
  }

  return {
    id,
    nome,
    linha,
    perfil,
    descricaoLonga: String(body.descricaoLonga || "").trim(),
    imagem,
    volume: String(body.volume || "").trim(),
    teorAlcoolico: String(body.teorAlcoolico || "").trim(),
    ingredientes: String(body.ingredientes || "").trim(),
    embalagem: String(body.embalagem || "").trim(),
    status,
    destaque: Boolean(body.destaque || body.exibirHome),
    exibirHome: Boolean(body.exibirHome || body.destaque),
    exibirCatalogo: body.exibirCatalogo !== false,
    exibirExportacao: Boolean(body.exibirExportacao),
    ordem: Number.isFinite(Number(body.ordem)) ? Number(body.ordem) : 0,
    ativo: body.ativo !== false,
  };
};

const isPublicProduct = (product) =>
  product.ativo !== false &&
  product.exibirCatalogo !== false &&
  !["rascunho", "oculto", "fora-de-linha"].includes(product.status);

const sanitizeBanner = (body) => {
  const titulo = String(body.titulo || "").trim();
  const subtitulo = String(body.subtitulo || "").trim();
  const imagem = String(body.imagem || "").trim();
  const id = normalizeSlug(body.id || titulo);

  if (!id || !titulo || !subtitulo || !imagem) {
    return { error: "Preencha id, titulo, subtitulo e imagem." };
  }

  return {
    id,
    area: "home-hero",
    titulo,
    subtitulo,
    selo: String(body.selo || "").trim(),
    imagem,
    imagemAlt: String(body.imagemAlt || titulo).trim(),
    ctaPrincipalTexto: String(body.ctaPrincipalTexto || "Ver catalogo").trim(),
    ctaPrincipalUrl: String(body.ctaPrincipalUrl || "/catalogo").trim(),
    ctaSecundarioTexto: String(body.ctaSecundarioTexto || "Area de exportacao").trim(),
    ctaSecundarioUrl: String(body.ctaSecundarioUrl || "/exportacao").trim(),
    status: body.status === "rascunho" ? "rascunho" : "publicado",
    ordem: Number.isFinite(Number(body.ordem)) ? Number(body.ordem) : 0,
    ativo: body.ativo !== false,
  };
};

const isPublicBanner = (banner) => banner.ativo !== false && banner.status === "publicado";

const sanitizePost = (body) => {
  const titulo = String(body.titulo || "").trim();
  const resumo = String(body.resumo || "").trim();
  const conteudoMarkdown = String(body.conteudoMarkdown || "").trim();
  const id = normalizeSlug(body.id || titulo);
  const status = body.status === "rascunho" ? "rascunho" : "publicado";
  const tags = Array.isArray(body.tags)
    ? body.tags.map((tag) => String(tag).trim()).filter(Boolean)
    : String(body.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  if (!id || !titulo || !resumo || !conteudoMarkdown) {
    return { error: "Preencha id, titulo, resumo e conteudo." };
  }

  return {
    id,
    titulo,
    resumo,
    conteudoMarkdown,
    imagemCapa: String(body.imagemCapa || "").trim(),
    autor: String(body.autor || "").trim(),
    tags,
    status,
    publicadoEm: body.publicadoEm ? String(body.publicadoEm) : new Date().toISOString(),
    ordem: Number.isFinite(Number(body.ordem)) ? Number(body.ordem) : 0,
    ativo: body.ativo !== false,
  };
};

const isPublicPost = (post) => post.ativo !== false && post.status === "publicado";

const byOrdem = (a, b) => (a.ordem || 0) - (b.ordem || 0);

const app = express();
app.use(express.json({ limit: "8mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/auth/login", async (req, res) => {
  const ip = req.ip || "unknown";
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." });
    return;
  }

  await ensureBootstrapUser();

  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");
  const userDoc = await db.collection("usuarios").doc(username).get();

  if (!userDoc.exists || !password || !verifyPassword(password, userDoc.data().salt, userDoc.data().hash)) {
    registerFailedAttempt(ip);
    res.status(401).json({ error: "Usuario ou senha invalidos." });
    return;
  }

  clearFailedAttempts(ip);
  const token = jwt.sign({ username }, sessionSecret, { expiresIn: `${sessionTtlHours}h` });
  const expiresAt = Date.now() + sessionTtlHours * 60 * 60 * 1000;
  res.json({ token, username, expiresAt });
});

app.post("/api/auth/logout", (req, res) => {
  // JWT sem estado: o logout so descarta o token no cliente.
  res.json({ ok: true });
});

app.get("/api/auth/session", (req, res) => {
  const session = sessionFromRequest(req);
  if (!session) {
    res.status(401).json({ error: "Sessao invalida ou expirada." });
    return;
  }
  res.json({ username: session.username });
});

app.post("/api/uploads", requireAdmin, async (req, res) => {
  const mimeType = String(req.body.mimeType || "").trim();
  const extension = allowedUploadTypes[mimeType];
  const contentBase64 = String(req.body.contentBase64 || "");

  if (!extension || !contentBase64) {
    res.status(400).json({ error: "Envie uma imagem JPG, PNG ou WEBP valida." });
    return;
  }

  const buffer = Buffer.from(contentBase64, "base64");
  if (!buffer.length || buffer.length > 5_000_000) {
    res.status(400).json({ error: "Imagem invalida ou maior que 5 MB." });
    return;
  }

  if (!matchesSignature(buffer, mimeType)) {
    res.status(400).json({ error: "O conteudo do arquivo nao corresponde a uma imagem valida." });
    return;
  }

  const baseName = normalizeUploadName(req.body.filename);
  const filename = `${baseName}-${Date.now()}.${extension}`;

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);

  // URL absoluta: o front pode estar hospedado em outro dominio (Firebase
  // Hosting) enquanto a API roda separada (Render), entao o caminho
  // relativo precisa apontar sempre para esta API, nao para o front.
  const caminho = `${req.protocol}://${req.get("host")}/api/uploads/${filename}`;
  res.status(201).json({ caminho, filename });
});

app.use("/api/uploads", express.static(uploadDir));

app.get("/api/produtos", async (req, res) => {
  const snapshot = await db.collection("produtos").get();
  res.json(snapshot.docs.map((doc) => doc.data()).filter(isPublicProduct).sort(byOrdem));
});

app.get("/api/produtos/:id", async (req, res) => {
  const doc = await db.collection("produtos").doc(req.params.id).get();
  const produto = doc.exists ? doc.data() : null;
  if (produto && isPublicProduct(produto)) {
    res.json(produto);
  } else {
    res.status(404).json({ error: "Produto nao encontrado." });
  }
});

app.get("/api/admin/produtos", requireAdmin, async (req, res) => {
  const snapshot = await db.collection("produtos").get();
  res.json(snapshot.docs.map((doc) => doc.data()).sort(byOrdem));
});

app.post("/api/produtos", requireAdmin, async (req, res) => {
  const payload = sanitizeProduct(req.body);
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  const ref = db.collection("produtos").doc(payload.id);
  if ((await ref.get()).exists) {
    res.status(409).json({ error: "Ja existe um produto com este id." });
    return;
  }
  await ref.set(payload);
  res.status(201).json(payload);
});

app.put("/api/produtos/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("produtos").doc(req.params.id);
  if (!(await ref.get()).exists) {
    res.status(404).json({ error: "Produto nao encontrado." });
    return;
  }
  const payload = sanitizeProduct({ ...req.body, id: req.params.id });
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  await ref.set(payload);
  res.json(payload);
});

app.delete("/api/produtos/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("produtos").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) {
    res.status(404).json({ error: "Produto nao encontrado." });
    return;
  }
  const updated = { ...doc.data(), ativo: false };
  await ref.set(updated);
  res.json(updated);
});

app.get("/api/banners", async (req, res) => {
  const snapshot = await db.collection("banners").get();
  res.json(snapshot.docs.map((doc) => doc.data()).filter(isPublicBanner).sort(byOrdem));
});

app.get("/api/banners/:id", async (req, res) => {
  const doc = await db.collection("banners").doc(req.params.id).get();
  const banner = doc.exists ? doc.data() : null;
  if (banner && isPublicBanner(banner)) {
    res.json(banner);
  } else {
    res.status(404).json({ error: "Banner nao encontrado." });
  }
});

app.get("/api/admin/banners", requireAdmin, async (req, res) => {
  const snapshot = await db.collection("banners").get();
  res.json(snapshot.docs.map((doc) => doc.data()).sort(byOrdem));
});

app.post("/api/admin/banners", requireAdmin, async (req, res) => {
  const payload = sanitizeBanner(req.body);
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  const ref = db.collection("banners").doc(payload.id);
  if ((await ref.get()).exists) {
    res.status(409).json({ error: "Ja existe um banner com este id." });
    return;
  }
  await ref.set(payload);
  res.status(201).json(payload);
});

app.put("/api/admin/banners/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("banners").doc(req.params.id);
  if (!(await ref.get()).exists) {
    res.status(404).json({ error: "Banner nao encontrado." });
    return;
  }
  const payload = sanitizeBanner({ ...req.body, id: req.params.id });
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  await ref.set(payload);
  res.json(payload);
});

app.delete("/api/admin/banners/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("banners").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) {
    res.status(404).json({ error: "Banner nao encontrado." });
    return;
  }
  const updated = { ...doc.data(), ativo: false };
  await ref.set(updated);
  res.json(updated);
});

app.get("/api/posts", async (req, res) => {
  const snapshot = await db.collection("posts").get();
  const posts = snapshot.docs
    .map((doc) => doc.data())
    .filter(isPublicPost)
    .sort((a, b) => new Date(b.publicadoEm) - new Date(a.publicadoEm));
  res.json(posts);
});

app.get("/api/posts/:id", async (req, res) => {
  const doc = await db.collection("posts").doc(req.params.id).get();
  const post = doc.exists ? doc.data() : null;
  if (post && isPublicPost(post)) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Artigo nao encontrado." });
  }
});

app.get("/api/admin/posts", requireAdmin, async (req, res) => {
  const snapshot = await db.collection("posts").get();
  res.json(snapshot.docs.map((doc) => doc.data()).sort((a, b) => new Date(b.publicadoEm) - new Date(a.publicadoEm)));
});

app.post("/api/admin/posts", requireAdmin, async (req, res) => {
  const payload = sanitizePost(req.body);
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  const ref = db.collection("posts").doc(payload.id);
  if ((await ref.get()).exists) {
    res.status(409).json({ error: "Ja existe um artigo com este id." });
    return;
  }
  await ref.set(payload);
  res.status(201).json(payload);
});

app.put("/api/admin/posts/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("posts").doc(req.params.id);
  if (!(await ref.get()).exists) {
    res.status(404).json({ error: "Artigo nao encontrado." });
    return;
  }
  const payload = sanitizePost({ ...req.body, id: req.params.id });
  if (payload.error) {
    res.status(400).json(payload);
    return;
  }
  await ref.set(payload);
  res.json(payload);
});

app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("posts").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) {
    res.status(404).json({ error: "Artigo nao encontrado." });
    return;
  }
  const updated = { ...doc.data(), ativo: false };
  await ref.set(updated);
  res.json(updated);
});

app.use((req, res) => {
  res.status(404).json({ error: "Rota nao encontrada." });
});

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message || "Erro interno." });
});

app.listen(port, () => {
  console.log(`API A Mais Indicada em http://localhost:${port}/api`);
});
