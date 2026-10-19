import { catalogoProdutos } from "../data/produtos";

const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const getDefaultProductPrice = (produto) => {
  const linha = String(produto.linha || "").toLowerCase();
  const id = String(produto.id || "").toLowerCase();
  const isSpecial = linha.includes("cremos") || ["ouro", "amburana"].includes(id);
  return isSpecial ? 50 : 40;
};

const normalizarImagem = (produto) => ({
  ...produto,
  volume: produto.volume || "750 ml",
  preco: Number(produto.preco) > 0 ? Number(produto.preco) : getDefaultProductPrice(produto),
  imagem:
    produto.imagem && produto.imagem.startsWith("/")
      ? `${process.env.PUBLIC_URL || ""}${produto.imagem}`
      : produto.imagem,
});

const fallbackProducts = catalogoProdutos.map((produto, index) => ({
  ...produto,
  preco: getDefaultProductPrice(produto),
  destaque: index < 8,
  ativo: true,
}));

const fallbackBanner = {
  id: "home-principal",
  area: "home-hero",
  titulo: "A Mais Indicada",
  subtitulo:
    "Uma marca familiar com sabores brasileiros, processo artesanal e uma nova presenca digital preparada para varejo, distribuidores e conversas de exportacao.",
  selo: "Cachacas e licores artesanais de Santa Catarina",
  imagem: "",
  imagemAlt: "Produtos A Mais Indicada em exposicao",
  ctaPrincipalTexto: "Ver catalogo",
  ctaPrincipalUrl: "/catalogo",
  ctaSecundarioTexto: "Area de exportacao",
  ctaSecundarioUrl: "/exportacao",
  status: "publicado",
  ativo: true,
};

const request = async (path, options = {}) => {
  const { token, headers, ...requestOptions } = options;
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...requestOptions,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Falha ao comunicar com a API.");
  }

  return data;
};

export const listarProdutos = async () => {
  try {
    const produtos = request("/produtos");
    const catalogoPorId = new Map(fallbackProducts.map((produto) => [produto.id, produto]));
    const atuais = (await produtos).map((produto) => normalizarImagem({ ...catalogoPorId.get(produto.id), ...produto }));
    const idsAtuais = new Set(atuais.map((produto) => produto.id));
    return [...atuais, ...fallbackProducts.filter((produto) => !idsAtuais.has(produto.id))];
  } catch (error) {
    return fallbackProducts;
  }
};

export const buscarProduto = async (id) => {
  try {
    const remoto = await request(`/produtos/${id}`);
    const base = fallbackProducts.find((produto) => produto.id === id);
    return normalizarImagem({ ...base, ...remoto });
  } catch (error) {
    return fallbackProducts.find((produto) => produto.id === id) || null;
  }
};

export const listarProdutosAdmin = async (token) => {
  const produtos = await request("/admin/produtos", { token });
  return produtos.map(normalizarImagem);
};

export const criarProduto = (produto, token) =>
  request("/produtos", {
    method: "POST",
    token,
    body: JSON.stringify(produto),
  });

export const atualizarProduto = (id, produto, token) =>
  request(`/produtos/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(produto),
  });

export const removerProduto = (id, token) =>
  request(`/produtos/${id}`, {
    method: "DELETE",
    token,
  });

export const listarBanners = async () => {
  try {
    const banners = await request("/banners");
    return banners.map(normalizarImagem);
  } catch (error) {
    return [fallbackBanner];
  }
};

export const listarBannersAdmin = async (token) => {
  const banners = await request("/admin/banners", { token });
  return banners.map(normalizarImagem);
};

export const criarBanner = (banner, token) =>
  request("/admin/banners", {
    method: "POST",
    token,
    body: JSON.stringify(banner),
  });

export const atualizarBanner = (id, banner, token) =>
  request(`/admin/banners/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(banner),
  });

export const removerBanner = (id, token) =>
  request(`/admin/banners/${id}`, {
    method: "DELETE",
    token,
  });

export const enviarImagemProduto = (arquivo, token) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const contentBase64 = String(reader.result).split(",")[1];
        const upload = await request("/uploads", {
          method: "POST",
          token,
          body: JSON.stringify({
            filename: arquivo.name,
            mimeType: arquivo.type,
            contentBase64,
          }),
        });
        resolve(upload);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(arquivo);
  });
