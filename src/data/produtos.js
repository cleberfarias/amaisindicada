const assetBase = `${process.env.PUBLIC_URL || ""}/produtos`;
const imagemPorArquivo = {
  "cachaca_01_prata.png": "prata.webp", "cachaca_02_ouro.png": "ouro.webp", "cachaca_03_verde.png": "Amburana.webp",
  "cachaca_04_reserva.png": "ouro.webp", "cachaca_05_ouro_clara.png": "ouro.webp",
  "licor_01_laranja.png": "groselha.webp", "licor_02_chocolate.png": "cacau.webp", "licor_03_morango.png": "morango.webp",
  "licor_04_limao.png": "limao.webp", "licor_05_menta.png": "menta.webp", "licor_06_maracuja.png": "marcauja.webp",
  "licor_07_uva.png": "groselha.webp", "licor_08_abacaxi.png": "abacaxi.webp", "licor_09_coco.png": "coco.webp",
  "licor_10_baunilha.png": "coco.webp", "licor_11_banana.png": "banana.webp", "licor_12_cafe.png": "cafe.webp",
  "licor_13_canelinha.png": "canela.webp", "licor_14_frutas_vermelhas.png": "morango.webp", "licor_15_cajamanga.png": "abacaxi.webp",
  "licor_16_pessego.png": "abacaxi.webp", "licor_17_melão.png": "abacaxi.webp", "licor_18_kiwi.png": "limao.webp",
  "licor_19_lichia.png": "coco.webp", "licor_20_amora.png": "groselha.webp", "licor_21_tutti_frutti.png": "morango.webp",
  "licor_22_creme.png": "coco.webp", "licor_23_castanha.png": "pacoca.webp",
};
const produtoImagem = (arquivo) => `${assetBase}/${imagemPorArquivo[arquivo] || arquivo}`;

const cachaças = [
  ["prata", "Cachaça Prata", "cachaca_01_prata.png", "Leve, clássica e versátil", "Prata"],
  ["ouro", "Cachaça Ouro", "cachaca_02_ouro.png", "Envelhecida, elegante e marcante", "Ouro"],
  ["verde", "Cachaça Verde", "cachaca_03_verde.png", "Fresca, aromática e brasileira", "Verde"],
  ["reserva", "Cachaça Reserva", "cachaca_04_reserva.png", "Encorpada, madura e especial", "Reserva"],
  ["ouro-clara", "Cachaça Ouro Clara", "cachaca_05_ouro_clara.png", "Suave, dourada e equilibrada", "Ouro"],
];
const licores = [
  ["laranja", "Licor Fino de Laranja", "licor_01_laranja.png", "Cítrico, perfumado e refrescante", "Laranja"],
  ["chocolate", "Licor Fino de Chocolate", "licor_02_chocolate.png", "Intenso, aveludado e indulgente", "Chocolate"],
  ["morango", "Licor Fino de Morango", "licor_03_morango.png", "Doce, frutado e delicado", "Morango"],
  ["limao", "Licor Fino de Limão", "licor_04_limao.png", "Cítrico, fresco e equilibrado", "Limão"],
  ["menta", "Licor Fino de Menta", "licor_05_menta.png", "Refrescante, leve e aromático", "Menta"],
  ["maracuja", "Licor Fino de Maracujá", "licor_06_maracuja.png", "Frutado, ácido e brasileiro", "Maracujá"],
  ["uva", "Licor Fino de Uva", "licor_07_uva.png", "Frutado, doce e intenso", "Uva"],
  ["abacaxi", "Licor Fino de Abacaxi", "licor_08_abacaxi.png", "Tropical, doce e vibrante", "Abacaxi"],
  ["coco", "Licor Fino de Coco", "licor_09_coco.png", "Tropical, cremoso e suave", "Coco"],
  ["baunilha", "Licor Fino de Baunilha", "licor_10_baunilha.png", "Aromático, macio e envolvente", "Baunilha"],
  ["banana", "Licor Fino de Banana", "licor_11_banana.png", "Brasileiro, doce e familiar", "Banana"],
  ["cafe", "Licor Fino de Café", "licor_12_cafe.png", "Intenso, aromático e afetivo", "Café"],
  ["canela", "Licor Fino de Canela", "licor_13_canelinha.png", "Especiado, aromático e acolhedor", "Canela"],
  ["frutas-vermelhas", "Licor Fino de Frutas Vermelhas", "licor_14_frutas_vermelhas.png", "Frutado, delicado e marcante", "Frutas vermelhas"],
  ["cajamanga", "Licor Fino de Cajamanga", "licor_15_cajamanga.png", "Exótico, frutado e tropical", "Cajamanga"],
  ["pessego", "Licor Fino de Pêssego", "licor_16_pessego.png", "Aveludado, doce e perfumado", "Pêssego"],
  ["melao", "Licor Fino de Melão", "licor_17_melão.png", "Leve, frutado e refrescante", "Melão"],
  ["kiwi", "Licor Fino de Kiwi", "licor_18_kiwi.png", "Cítrico, frutado e vibrante", "Kiwi"],
  ["lichia", "Licor Fino de Lichia", "licor_19_lichia.png", "Floral, delicado e refrescante", "Lichia"],
  ["amora", "Licor Fino de Amora", "licor_20_amora.png", "Frutado, intenso e levemente ácido", "Amora"],
  ["tutti-frutti", "Licor Fino de Tutti-Frutti", "licor_21_tutti_frutti.png", "Aromático, alegre e frutado", "Tutti-frutti"],
  ["creme", "Licor Cremoso", "licor_22_creme.png", "Cremoso, suave e acolhedor", "Creme"],
  ["castanha", "Licor Cremoso de Castanha", "licor_23_castanha.png", "Cremoso, tostado e aveludado", "Castanha"],
];

const makeProduct = ([id, nome, arquivo, perfil, sabor], linha, volume) => ({
  id, nome, linha, perfil, sabor,
  descricaoLonga: `${nome} artesanal da A Mais Indicada, elaborado para valorizar o sabor ${sabor.toLowerCase()} em uma experiência equilibrada e marcante.`,
  volume, teorAlcoolico: "Consulte a embalagem", embalagem: "Garrafa de vidro",
  ingredientes: `Bebida alcoólica sabor ${sabor.toLowerCase()}. Consulte o rótulo para a composição completa.`,
  imagem: produtoImagem(arquivo),
});

export const catalogoProdutos = [
  ...cachaças.map((produto) => makeProduct(produto, "Cachaças", "750 ml")),
  ...licores.map((produto) => makeProduct(produto, "Licores", "500 ml")),
];
export const produtosDestaque = catalogoProdutos.slice(0, 8);
export const perfisRecomendacao = [
  { id: "presente", sugestao: "Licor Cremoso de Castanha" },
  { id: "tradicao", sugestao: "Licor Fino de Café" },
  { id: "classico", sugestao: "Cachaça Ouro" },
  { id: "refrescante", sugestao: "Licor Fino de Limão" },
];
