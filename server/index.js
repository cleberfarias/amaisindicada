require("dotenv").config();
const express = require("express");
const { initializeApp, cert, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");
const { mkdir, writeFile } = require("fs/promises");
const path = require("path");
const jwt = require("jsonwebtoken");

const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.ALLOWED_ORIGIN || "http://localhost:3000,http://localhost:4174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const sessionTtlHours = Number(process.env.SESSION_TTL_HOURS || 12);
const sessionSecret = process.env.SESSION_SECRET;
const adminUsername = process.env.ADMIN_USERNAME || "";
const adminPassword = process.env.ADMIN_PASSWORD || "";
const uploadDir = path.join(__dirname, "uploads");
const correiosBaseUrl =
  process.env.CORREIOS_AMBIENTE === "homologacao" ? "https://apihom.correios.com.br" : "https://api.correios.com.br";
const correiosServices = (process.env.CORREIOS_SERVICOS || "03220:PAC,03298:SEDEX")
  .split(",")
  .map((item) => {
    const [codigo, nome] = item.split(":");
    return { codigo: String(codigo || "").trim(), nome: String(nome || codigo || "").trim() };
  })
  .filter((item) => item.codigo);
let correiosTokenCache = null;

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

const getDefaultProductPrice = (product) => {
  const linha = String(product.linha || "").toLowerCase();
  const id = String(product.id || "").toLowerCase();
  const isSpecial = linha.includes("cremos") || ["ouro", "amburana"].includes(id);
  return isSpecial ? 50 : 40;
};

const getProductPrice = (product) => {
  const price = Number(product.preco);
  return Number.isFinite(price) && price > 0 ? price : getDefaultProductPrice(product);
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
  const preco = Number(String(body.preco || "").replace(",", "."));
  const pesoGramas = Number(body.pesoGramas);
  const comprimentoCm = Number(body.comprimentoCm);
  const larguraCm = Number(body.larguraCm);
  const alturaCm = Number(body.alturaCm);
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
    preco: Number.isFinite(preco) && preco > 0 ? preco : getDefaultProductPrice({ id, linha }),
    estoque: String(body.estoque || "").trim(),
    pesoGramas: Number.isFinite(pesoGramas) && pesoGramas > 0 ? pesoGramas : 1200,
    comprimentoCm: Number.isFinite(comprimentoCm) && comprimentoCm > 0 ? comprimentoCm : 20,
    larguraCm: Number.isFinite(larguraCm) && larguraCm > 0 ? larguraCm : 20,
    alturaCm: Number.isFinite(alturaCm) && alturaCm > 0 ? alturaCm : 20,
    status,
    destaque: Boolean(body.destaque || body.exibirHome),
    exibirHome: Boolean(body.exibirHome || body.destaque),
    exibirCatalogo: body.exibirCatalogo !== false,
    exibirExportacao: Boolean(body.exibirExportacao),
    exibirLoja: body.exibirLoja !== false,
    ordem: Number.isFinite(Number(body.ordem)) ? Number(body.ordem) : 0,
    ativo: body.ativo !== false,
  };
};

const isPublicProduct = (product) =>
  product.ativo !== false &&
  product.exibirCatalogo !== false &&
  !["rascunho", "oculto", "fora-de-linha"].includes(product.status);

const digitsOnly = (value) => String(value || "").replace(/\D/g, "");

const formatDateBr = (date = new Date()) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const parseMoney = (value) => {
  if (typeof value === "number") {
    return value;
  }
  const normalized = String(value || "0")
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getCorreiosToken = async () => {
  if (correiosTokenCache && correiosTokenCache.expiresAt > Date.now() + 60_000) {
    return correiosTokenCache.token;
  }

  const idCorreios = process.env.CORREIOS_ID;
  const codigoAcesso = process.env.CORREIOS_CODIGO_ACESSO;
  const cartaoPostagem = process.env.CORREIOS_CARTAO_POSTAGEM;

  if (!idCorreios || !codigoAcesso || !cartaoPostagem) {
    throw new Error("Credenciais dos Correios nao configuradas.");
  }

  const response = await fetch(`${correiosBaseUrl}/token/v1/autentica/cartaopostagem`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${idCorreios}:${codigoAcesso}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      numero: cartaoPostagem,
      contrato: process.env.CORREIOS_CONTRATO || undefined,
      dr: process.env.CORREIOS_DR ? Number(process.env.CORREIOS_DR) : undefined,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.token) {
    throw new Error(data.msg || data.message || "Nao foi possivel autenticar nos Correios.");
  }

  correiosTokenCache = {
    token: data.token,
    expiresAt: data.expiraEm ? new Date(data.expiraEm).getTime() : Date.now() + 50 * 60 * 1000,
  };
  return correiosTokenCache.token;
};

const buildPackageFromItems = (items) => {
  const pesoGramas = items.reduce((sum, item) => sum + Number(item.pesoGramas || 1200) * item.quantidade, 0);
  const comprimentoCm = Math.max(...items.map((item) => Number(item.comprimentoCm || 20)), 20);
  const larguraCm = Math.max(...items.map((item) => Number(item.larguraCm || 20)), 20);
  const alturaCm = Math.max(2, items.reduce((sum, item) => sum + Number(item.alturaCm || 20) * item.quantidade, 0));

  return {
    pesoGramas: Math.max(300, Math.ceil(pesoGramas)),
    comprimentoCm: Math.ceil(comprimentoCm),
    larguraCm: Math.ceil(larguraCm),
    alturaCm: Math.ceil(alturaCm),
  };
};

const normalizeCorreiosOption = (service, priceData, prazoData) => ({
  id: service.codigo,
  nome: service.nome,
  codigo: service.codigo,
  valor: parseMoney(priceData.pcFinal || priceData.valor || priceData.preco || priceData.precoFinal),
  prazoDias: Number(prazoData.prazoEntrega || prazoData.prazo || prazoData.dias || 0),
});

const calculateCorreiosShipping = async ({ cepDestino, items }) => {
  const cepOrigem = digitsOnly(process.env.CORREIOS_CEP_ORIGEM);
  const destino = digitsOnly(cepDestino);
  if (cepOrigem.length !== 8 || destino.length !== 8) {
    throw new Error("Informe CEP de origem e destino com 8 digitos.");
  }

  const token = await getCorreiosToken();
  const pacote = buildPackageFromItems(items);

  const results = await Promise.all(
    correiosServices.map(async (service) => {
      const params = new URLSearchParams({
        cepDestino: destino,
        cepOrigem,
        psObjeto: String(pacote.pesoGramas),
        tpObjeto: "2",
        comprimento: String(pacote.comprimentoCm),
        largura: String(pacote.larguraCm),
        altura: String(pacote.alturaCm),
      });

      const [priceResponse, prazoResponse] = await Promise.all([
        fetch(`${correiosBaseUrl}/preco/v1/nacional/${service.codigo}?${params}`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        }),
        fetch(`${correiosBaseUrl}/prazo/v1/nacional`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idLote: "loja",
            parametrosPrazo: [
              {
                coProduto: service.codigo,
                nuRequisicao: service.codigo,
                cepOrigem,
                cepDestino: destino,
                dataPostagem: formatDateBr(),
              },
            ],
          }),
        }),
      ]);

      const priceData = await priceResponse.json().catch(() => ({}));
      const prazoData = await prazoResponse.json().catch(() => ({}));
      if (!priceResponse.ok || !prazoResponse.ok) {
        return null;
      }

      const normalizedPrice = Array.isArray(priceData) ? priceData[0] : priceData;
      const normalizedPrazo = Array.isArray(prazoData) ? prazoData[0] : prazoData?.prazoEntrega?.[0] || prazoData;
      const option = normalizeCorreiosOption(service, normalizedPrice, normalizedPrazo);
      return option.valor > 0 ? option : null;
    })
  );

  return results.filter(Boolean);
};

const getCheckoutItems = async (items = []) => {
  const normalizedItems = Array.isArray(items)
    ? items
        .map((item) => ({ id: String(item.id || ""), quantidade: Math.max(1, Number(item.quantidade || 1)) }))
        .filter((item) => item.id)
    : [];

  if (!normalizedItems.length) {
    throw new Error("Carrinho vazio.");
  }

  const productDocs = await Promise.all(normalizedItems.map((item) => db.collection("produtos").doc(item.id).get()));
  return normalizedItems.map((item, index) => {
    const product = productDocs[index].exists ? productDocs[index].data() : null;
    if (!product || !isPublicProduct(product) || product.exibirLoja === false) {
      throw new Error("Um dos produtos nao esta disponivel para compra.");
    }

    return {
      id: product.id,
      nome: product.nome,
      preco: getProductPrice(product),
      quantidade: item.quantidade,
      pesoGramas: product.pesoGramas,
      comprimentoCm: product.comprimentoCm,
      larguraCm: product.larguraCm,
      alturaCm: product.alturaCm,
    };
  });
};

const publicOrder = (pedido) => {
  if (!pedido) {
    return null;
  }

  const { accessToken, ...safeOrder } = pedido;
  return safeOrder;
};

const requireOrderAccess = async (req, res) => {
  const doc = await db.collection("pedidos").doc(req.params.id).get();
  const pedido = doc.exists ? doc.data() : null;
  const token = String(req.query.token || req.body?.token || req.headers["x-order-token"] || "");

  if (!pedido || !pedido.accessToken || pedido.accessToken !== token) {
    res.status(404).json({ error: "Pedido nao encontrado." });
    return null;
  }

  return { ref: doc.ref, pedido };
};

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

const sanitizePostTranslations = (translations = {}) => {
  const langs = ["en", "es"];

  return langs.reduce((acc, lang) => {
    const source = translations[lang] || {};
    const titulo = String(source.titulo || "").trim();
    const resumo = String(source.resumo || "").trim();
    const conteudoMarkdown = String(source.conteudoMarkdown || "").trim();

    if (titulo || resumo || conteudoMarkdown) {
      acc[lang] = { titulo, resumo, conteudoMarkdown };
    }

    return acc;
  }, {});
};

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
    translations: sanitizePostTranslations(body.translations),
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
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || allowedOrigins[0] || "*");
  }
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

const SITE_URL = "https://amaisindicada.com.br";
const STATIC_PAGES = ["/", "/catalogo", "/institucional", "/exportacao", "/contato", "/blog"];

const escapeXml = (value) =>
  String(value || "").replace(/[<>&'"]/g, (char) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  }[char]));

const staticUrlEntry = (path) => {
  const pt = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const en = path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;
  const es = path === "/" ? `${SITE_URL}/es` : `${SITE_URL}/es${path}`;
  return `  <url>
    <loc>${escapeXml(pt)}</loc>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${escapeXml(pt)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />
    <xhtml:link rel="alternate" hreflang="es" href="${escapeXml(es)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(pt)}" />
  </url>`;
};

const dynamicUrlEntry = (path) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${path}`)}</loc>
  </url>`;

app.get("/api/sitemap.xml", async (req, res) => {
  const [produtosSnap, postsSnap] = await Promise.all([
    db.collection("produtos").get(),
    db.collection("posts").get(),
  ]);

  const produtoUrls = produtosSnap.docs
    .map((doc) => doc.data())
    .filter(isPublicProduct)
    .map((produto) => dynamicUrlEntry(`/produto/${produto.id}`));

  const postUrls = postsSnap.docs
    .map((doc) => doc.data())
    .filter(isPublicPost)
    .map((post) => dynamicUrlEntry(`/blog/${post.id}`));

  const entries = [...STATIC_PAGES.map(staticUrlEntry), ...produtoUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>
`;

  res.set("Content-Type", "application/xml; charset=utf-8");
  res.send(xml);
});

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

app.post("/api/checkout/frete", async (req, res) => {
  try {
    const items = await getCheckoutItems(req.body.items);
    const options = await calculateCorreiosShipping({ cepDestino: req.body.cepDestino, items });
    res.json({ options });
  } catch (error) {
    const status = error.message.includes("Credenciais dos Correios") ? 503 : 400;
    res.status(status).json({ error: error.message || "Nao foi possivel calcular o frete." });
  }
});

app.post("/api/pedidos", async (req, res) => {
  try {
    const items = await getCheckoutItems(req.body.items);
    const frete = req.body.frete || {};
    const cliente = req.body.cliente || {};
    const endereco = req.body.endereco || {};
    const nome = String(cliente.nome || "").trim();
    const email = String(cliente.email || "").trim();
    const telefone = String(cliente.telefone || "").trim();
    const cep = digitsOnly(endereco.cep);

    if (!nome || !email || !telefone || cep.length !== 8 || !endereco.logradouro || !endereco.numero || !endereco.cidade || !endereco.uf) {
      res.status(400).json({ error: "Preencha dados de contato e endereco de entrega." });
      return;
    }

    if (!frete.id || !frete.nome || !Number.isFinite(Number(frete.valor))) {
      res.status(400).json({ error: "Selecione uma opcao de frete valida." });
      return;
    }

    const subtotal = items.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    const freteValor = Number(frete.valor);
    const total = subtotal + freteValor;
    const ref = db.collection("pedidos").doc();
    const accessToken = randomBytes(24).toString("hex");
    const pedido = {
      id: ref.id,
      accessToken,
      cliente: { nome, email, telefone },
      endereco: {
        cep,
        logradouro: String(endereco.logradouro || "").trim(),
        numero: String(endereco.numero || "").trim(),
        complemento: String(endereco.complemento || "").trim(),
        bairro: String(endereco.bairro || "").trim(),
        cidade: String(endereco.cidade || "").trim(),
        uf: String(endereco.uf || "").trim().toUpperCase().slice(0, 2),
      },
      items,
      frete: {
        id: String(frete.id),
        nome: String(frete.nome),
        valor: freteValor,
        prazoDias: Number(frete.prazoDias || 0),
      },
      subtotal,
      total,
      status: "aguardando_pagamento",
      historico: [{ status: "aguardando_pagamento", data: new Date().toISOString(), nota: "Pedido criado." }],
      rastreio: "",
      cancelamento: null,
      devolucao: null,
      pagamento: {
        metodo: String(req.body.pagamento?.metodo || "pix").trim(),
        status: "pendente",
      },
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    };

    await ref.set(pedido);
    res.status(201).json({ ...publicOrder(pedido), accessToken });
  } catch (error) {
    res.status(400).json({ error: error.message || "Nao foi possivel criar o pedido." });
  }
});

app.get("/api/pedidos/:id", async (req, res) => {
  const access = await requireOrderAccess(req, res);
  if (!access) {
    return;
  }
  res.json(publicOrder(access.pedido));
});

app.post("/api/pedidos/:id/cancelamento", async (req, res) => {
  const access = await requireOrderAccess(req, res);
  if (!access) {
    return;
  }

  const blockedStatuses = ["enviado", "entregue", "cancelado", "reembolsado"];
  if (blockedStatuses.includes(access.pedido.status)) {
    res.status(400).json({ error: "Este pedido nao pode ser cancelado nesta etapa. Solicite devolucao se aplicavel." });
    return;
  }

  const updated = {
    ...access.pedido,
    status: "cancelamento_solicitado",
    cancelamento: {
      solicitadoEm: new Date().toISOString(),
      motivo: String(req.body.motivo || "").trim(),
      status: "solicitado",
    },
    historico: [
      ...(access.pedido.historico || []),
      { status: "cancelamento_solicitado", data: new Date().toISOString(), nota: "Cancelamento solicitado pelo cliente." },
    ],
    atualizadoEm: new Date().toISOString(),
  };

  await access.ref.set(updated);
  res.json(publicOrder(updated));
});

app.post("/api/pedidos/:id/devolucao", async (req, res) => {
  const access = await requireOrderAccess(req, res);
  if (!access) {
    return;
  }

  if (!["enviado", "entregue"].includes(access.pedido.status)) {
    res.status(400).json({ error: "A devolucao fica disponivel depois do envio ou entrega." });
    return;
  }

  const updated = {
    ...access.pedido,
    status: "devolucao_solicitada",
    devolucao: {
      solicitadoEm: new Date().toISOString(),
      motivo: String(req.body.motivo || "").trim(),
      status: "solicitada",
    },
    historico: [
      ...(access.pedido.historico || []),
      { status: "devolucao_solicitada", data: new Date().toISOString(), nota: "Devolucao solicitada pelo cliente." },
    ],
    atualizadoEm: new Date().toISOString(),
  };

  await access.ref.set(updated);
  res.json(publicOrder(updated));
});

app.get("/api/admin/pedidos", requireAdmin, async (req, res) => {
  const snapshot = await db.collection("pedidos").get();
  const pedidos = snapshot.docs
    .map((doc) => publicOrder(doc.data()))
    .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
  res.json(pedidos);
});

app.put("/api/admin/pedidos/:id", requireAdmin, async (req, res) => {
  const ref = db.collection("pedidos").doc(req.params.id);
  const doc = await ref.get();
  if (!doc.exists) {
    res.status(404).json({ error: "Pedido nao encontrado." });
    return;
  }

  const current = doc.data();
  const allowedStatuses = [
    "aguardando_pagamento",
    "pago",
    "em_separacao",
    "enviado",
    "entregue",
    "cancelamento_solicitado",
    "cancelado",
    "devolucao_solicitada",
    "reembolsado",
  ];
  const status = allowedStatuses.includes(req.body.status) ? req.body.status : current.status;
  const pagamentoStatus = ["pendente", "aprovado", "recusado", "estornado"].includes(req.body.pagamentoStatus)
    ? req.body.pagamentoStatus
    : current.pagamento?.status || "pendente";
  const updated = {
    ...current,
    status,
    rastreio: String(req.body.rastreio || current.rastreio || "").trim(),
    pagamento: {
      ...(current.pagamento || {}),
      status: pagamentoStatus,
      metodo: String(req.body.pagamentoMetodo || current.pagamento?.metodo || "pix").trim(),
    },
    historico: [
      ...(current.historico || []),
      { status, data: new Date().toISOString(), nota: String(req.body.nota || "Status atualizado pelo admin.").trim() },
    ],
    atualizadoEm: new Date().toISOString(),
  };

  await ref.set(updated);
  res.json(publicOrder(updated));
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
