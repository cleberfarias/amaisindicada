import React, { useState } from "react";
import { sabores } from "./imagens";
import { useParams, Link } from "react-router-dom"; // Importando Link
import Header from "./HeadrCatalago";
import Footer from "./FooterCatalogo";

function DetalhesProduto() {
  const { id } = useParams();
  const produtos = [
    {
      id: 1,
      nome: "Prata",
      descricao: `Nossa cachaça prata é perfeita para drinks refrescantes. Pura e suave.
Cachaça de mosto fermentado de cana de açúcar. Graduação alcoólica 40% em volume. 
Não contém glúten. Prazo de validade: indeterminado. Proibida a venda para menores de22 anos. 
Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 30.0,
      estoque: 100,
      imagem: sabores.Prata,
    },
    {
      id: 2,
      nome: "Ouro",
      descricao: `A cachaça ouro envelhecida 1 ano em barris de carvalho, oferece um sabor complexo e aveludado.
Cachaça de mosto fermentado de cana de açúcar e reservada em barril de carvalho. Graduação alcoólica 40% em volume. 
Não contém glúten. Prazo de validade: indeterminado. Proibida a venda para menores de22 anos. 
Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Ouro,
    },
    {
      id: 12,
      nome: "Amburana",
      descricao: `A amburana traz um toque diferenciado, com aromas marcantes de canela e especiarias. 
      Por ser de tradição brasileira, é uma maneira de valorizar e respeitar o patrimônio cultural do país. 
Cachaça de mosto fermentado de cana de açúcar e reservada em barril de amburana. Graduação alcoólica 40% em volume. 
Não contém glúten. Prazo de validade: indeterminado. Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. Se beber não dirija. 
`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Amburana,
    },
    {
      id: 19,
      nome: "Licor Fino de Café",
      descricao: `O licor fino de café é rico e aromático, perfeito para os amantes de café.
Ingredientes: cachaça, água, açúcar, café, essência de baunilha. 
Não contém glúten. Prazo de validade: indeterminado. Agite antes de beber. Proibida a venda para menores de22 anos. 
Evite o consumo excessivo de álcool. Se beber não dirija. 
`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Cafe,
    },
    {
      id: 16,
      nome: "Licor Fino de Canela",
      descricao: `Aqueça-se com o licor fino de canela. Sabor picante e reconfortante. 
Ingredientes: cachaça, água, açúcar, canela e cravo. Não contém glúten. Prazo de validade: 
indeterminado. Agite antes de beber. Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. 
Se beber não dirija.`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Canela,
    },
    {
      id: 7,
      nome: "Licor Fino de Figo",
      descricao: `O licor fino de figo traz uma doçura sofisticada e única. 
Ingredientes: cachaça, água, açúcar, ervas naturais aromatizantes. Não contém glúten. 
Prazo de validade: indeterminado. 
Agite antes de beber. Proibida a venda para menores de22 anos. 
Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Figo,
    },
    {
      id: 8,
      nome: "Licor Fino de Groselha",
      descricao: `O licor fino de groselha é vibrante e cheio de sabor. Uma verdadeira joia líquida.
Ingredientes: cachaça, água, xarope de groselha, açúcar, ervas aromáticas. Não contém glúten. 
Prazo de validade: indeterminado. 
Agite antes de beber. Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. 
Se beber não dirija. `,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Groselha,
    },
    {
      id: 9,
      nome: "Licor Fino de Maçã Verde",
      descricao: `Frescor e acidez na medida certa com o licor fino de maçã verde. 
Ingredientes: cachaça, água, açúcar, essência de maçã verde, cravo, corante verde. 
Não contém glúten. Prazo de validade: indeterminado. 
Agite antes de beber. Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. S
e beber não dirija.`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.MacaVerde,
    },
    {
      id: 3,
      nome: "Licor Banana",
      descricao: `O licor fino de banana é uma explosão de sabor. Ideal para drinks exóticos. 
Ingredientes: cachaça, água, açúcar, cravo, essência natural de banana, corante amarelo. Não contém glúten. Prazo de validade: indeterminado. 
Agite antes de beber. Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Banana,
    },
    {
      id: 18,
      nome: "Licor Fino de Menta",
      descricao: `Refrescância garantida com o licor fino de menta. Perfeito para drinks refrescantes.
Ingredientes: cachaça, água, açúcar, hortelã, essência de menta, cravo, corante verde. Não contém glúten. 
Prazo de validade: indeterminado. Agite antes de beber. Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.  
`,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Menta,
    },
    {
      id: 15,
      nome: "Licor Fino de Açúcar Mascavo",
      descricao: `Feito com a cana-de-açúcar da nossa terra e o carinho das nossas raízes. 
      Um toque de doçura que só a nossa terra sabe dar. 
Ingredientes: cachaça, água, açúcar mascavo, açúcar branco, ervas aromáticas especiais. 
Não contém glúten. Prazo de validade: indeterminado. `,
      preco: 35.0,
      estoque: 50,
      imagem: sabores.AcucarMascavo,
    },
    {
      id: 4,
      nome: "Licor Cacau",
      descricao: `O licor cremoso de cacau é puro prazer. Perfeito para os amantes de chocolate.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, creme de avelã, cacau, açúcar, café, estabilizante, goma xantana. 
Não contém glúten. Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. Agite antes de beber.  Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.  
`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Cacau,
    },
    {
      id: 6,
      nome: "Licor Coco",
      descricao: `O licor cremoso de coco é uma verdadeira tentação.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, coco ralado, chocolate branco, leite de coco, essência de coco, estabilizante, goma xantana.
 Não contém glúten. Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. 
Agite antes de beber.  Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija. `,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Coco,
    },
    {
      id: 10,
      nome: "Licor Maracujá",
      descricao: `Acalme-se com o licor cremoso de maracujá. Suave e delicioso.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, açúcar, suco de fruta concentrado de maracujá, corante, estabilizante, goma xantana. 
Não contém glúten. Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. 
Agite antes de beber.  Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.  
`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Maracuja,
    },
    {
      id: 11,
      nome: "Licor Morango",
      descricao: `Nosso licor cremoso de morango é doce e vibrante. Uma verdadeira delícia.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, morango, açúcar, essência de morango, corante estabilizante, goma xantana. 
Não contém glúten. Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. 
Agite antes de beber.  Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Morango,
    },
    {
      id: 5,
      nome: "Licor Cremoso Abacaxi",
      descricao: `Delicie-se com nosso licor cremoso de abacaxi. Um toque tropical para qualquer ocasião.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, polpa de abacaxi, açúcar, essência de abacaxi, estabilizante, goma xantana. 
Não contém glúten. 
Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. Agite antes`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Abacaxi,
    },
    {
      id: 13,
      nome: "Licor Cremoso de Paçoca",
      descricao: `Aprecie o sabor único do licor cremoso de paçoca. Perfeito para quem ama amendoim.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, paçoca de amendoim, cacau, estabilizante, goma xantana. Não contém glúten. 
Alérgicos: contém amendoim e lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. Agite antes de beber.  
Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija. `,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Pacoca,
    },
    {
      id: 14,
      nome: "Licor Cremoso de Pistache",
      descricao: `Aos paladares exigentes, o Pistache possui um sabor tradicional das frutas secas, porém sem abrir mão de uma doçura equilibrada. 
      Seu paladar é equilibrado e cremoso.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, pasta de pistache, aroma de pistache, citrato de sódio, goma xantana. 
Não contém glúten. Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. 
Agite antes de beber.  Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.  
`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Pistache,
    },
    {
      id: 17,
      nome: "Licor Cremoso Doce de Leite",
      descricao: `Doce de leite em forma de licor. Irresistível! 
Ingredientes: cachaça, água potável, leite condensado, creme de leite, doce de leite, essência de doce de leite, estabilizante, goma xantana. Não contém glúten. 
Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. Agite antes de beber.  
Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija.`,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.DoceDeLeite,
    },
    {
      id: 20,
      nome: "Licor Cremoso de Limão",
      descricao: `Refresque-se com nosso licor cremoso de limão. Sabor e frescor em cada gole.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, poupa concentrada de limão, açúcar, essência de limão, estabilizante, goma xantana. 
Não contém glúten. 
Prazo de validade: 6 meses após data de fabricação. Após aberto, conservar resfriado por até 7 dias. Agite antes de beber.  
Proibida a venda para menores de 18 anos. Evite o consumo excessivo de álcool. Se beber não dirija. `,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Limao,
    },
    {
      id: 22,
      nome: "Licor Cremoso de Chocolate Branco",
      descricao: `Um toque de doçura para os apaixonados por chocolate branco.
Ingredientes: cachaça, água potável, leite condensado, creme de leite, chocolate branco, açúcar, essência de 
chocolate branco, estabilizante, goma xantana. Não contém glúten. 
Alérgicos: contém lactose. Prazo de validade: 6 meses após data de fabricação. 
Após aberto conservar resfriado por até 7 dias. Agite antes de beber.  Proibida a venda para menores de22 anos. Evite o consumo excessivo de álcool. Se beber não dirija.  `,
      preco: 40.0,
      estoque: 50,
      imagem: sabores.ChoclateBranco,
    },
  ];

  const produto = produtos.find((produto) => produto.id === parseInt(id));
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQuantidade = () => {
    if (quantidade < produto.estoque) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  if (!produto) {
    return;
  }

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#ffebcf",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ flex: 1, textAlign: "center", marginBottom: "20px" }}>
          <img
            src={produto.imagem}
            alt={produto.nome}
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </div>
        <div style={{ flex: 2, paddingLeft: "20px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
            {produto.nome}
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
            {produto.descricao}
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/catálogo">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#A62A2A",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Voltar para os Produtos
          </button>
        </Link>
      </div>
    </>
  );
}

export default DetalhesProduto;
