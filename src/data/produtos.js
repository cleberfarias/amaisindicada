const assetBase = `${process.env.PUBLIC_URL || ""}/produtos`;

const produtoImagem = (arquivo) => `${assetBase}/${arquivo}`;

export const produtosDestaque = [
  {
    id: "prata",
    nome: "Cachaca Prata",
    linha: "Cachacas",
    perfil: "Leve, classica e versatil",
    imagem: produtoImagem("prata.webp"),
  },
  {
    id: "ouro",
    nome: "Cachaca Ouro",
    linha: "Cachacas",
    perfil: "Envelhecida, elegante e marcante",
    imagem: produtoImagem("ouro.webp"),
  },
  {
    id: "amburana",
    nome: "Cachaca Amburana",
    linha: "Cachacas",
    perfil: "Aromatica, brasileira e intensa",
    imagem: produtoImagem("Amburana.webp"),
  },
  {
    id: "cafe",
    nome: "Licor Fino de Cafe",
    linha: "Licores finos",
    perfil: "Intenso, aromatico e afetivo",
    imagem: produtoImagem("cafe.webp"),
  },
  {
    id: "figo",
    nome: "Licor Fino de Figo",
    linha: "Licores finos",
    perfil: "Tradicional, doce e familiar",
    imagem: produtoImagem("figo.webp"),
  },
  {
    id: "pistache",
    nome: "Licor Cremoso de Pistache",
    linha: "Licores cremosos",
    perfil: "Cremoso, premium e presenteavel",
    imagem: produtoImagem("pistache.webp"),
  },
  {
    id: "morango",
    nome: "Licor Cremoso de Morango",
    linha: "Licores cremosos",
    perfil: "Doce, frutado e delicado",
    imagem: produtoImagem("morango.webp"),
  },
  {
    id: "limao",
    nome: "Licor Cremoso de Limao",
    linha: "Licores cremosos",
    perfil: "Citrico, fresco e equilibrado",
    imagem: produtoImagem("limao.webp"),
  },
];

export const perfisRecomendacao = [
  {
    id: "presente",
    sugestao: "Licor Cremoso de Pistache",
  },
  {
    id: "tradicao",
    sugestao: "Licor Fino de Figo",
  },
  {
    id: "classico",
    sugestao: "Cachaca Ouro",
  },
  {
    id: "refrescante",
    sugestao: "Licor Cremoso de Limao",
  },
];

export const catalogoProdutos = [
  ...produtosDestaque,
  {
    id: "canela",
    nome: "Licor Fino de Canela",
    linha: "Licores finos",
    perfil: "Especiado, aromatico e acolhedor",
    imagem: produtoImagem("canela.webp"),
  },
  {
    id: "groselha",
    nome: "Licor Fino de Groselha",
    linha: "Licores finos",
    perfil: "Frutado, doce e marcante",
    imagem: produtoImagem("groselha.webp"),
  },
  {
    id: "banana",
    nome: "Licor Fino de Banana",
    linha: "Licores finos",
    perfil: "Brasileiro, doce e familiar",
    imagem: produtoImagem("banana.webp"),
  },
  {
    id: "menta",
    nome: "Licor Fino de Menta",
    linha: "Licores finos",
    perfil: "Refrescante, leve e aromatico",
    imagem: produtoImagem("menta.webp"),
  },
  {
    id: "cacau",
    nome: "Licor Cremoso de Cacau",
    linha: "Licores cremosos",
    perfil: "Cremoso, intenso e sobremesa",
    imagem: produtoImagem("cacau.webp"),
  },
  {
    id: "coco",
    nome: "Licor Cremoso de Coco",
    linha: "Licores cremosos",
    perfil: "Tropical, cremoso e suave",
    imagem: produtoImagem("coco.webp"),
  },
  {
    id: "maracuja",
    nome: "Licor Cremoso de Maracuja",
    linha: "Licores cremosos",
    perfil: "Frutado, citrico e brasileiro",
    imagem: produtoImagem("marcauja.webp"),
  },
  {
    id: "abacaxi",
    nome: "Licor Cremoso de Abacaxi",
    linha: "Licores cremosos",
    perfil: "Tropical, doce e vibrante",
    imagem: produtoImagem("abacaxi.webp"),
  },
  {
    id: "pacoca",
    nome: "Licor Cremoso de Pacoca",
    linha: "Licores cremosos",
    perfil: "Brasileiro, cremoso e afetivo",
    imagem: produtoImagem("pacoca.webp"),
  },
];
