import styled from "styled-components";
import Input from "../Input/Input";
import { useState, useEffect } from "react";
import { getSabores } from "../../servicos/Sabores";

const fonts = {
  alumni: "Alumni Sans Collegiate One",
  noto: "Noto Serif Old Uyghur",
};

const PesquisaConteiner = styled.section`
  background-image: linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%);
  color: #FFF;
  text-align: center;
  padding: 1px 1px;
  height: 270px;
  width: 100%;
  font-family: ${fonts.alumni};
`;

const Titulo = styled.h2`
  color: #FFF;
  font-size: 26px;
  text-align: center;
  width: 100%;
  font-family: ${fonts.alumni};
`;

const Subtitulo = styled.h3`
  font-size: 15px;
  font-weight: 300;
  margin-bottom: 40px;
  color: #FFF;
  font-family: ${fonts.alumni};
`;

const Resultado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  p {
    width: 100px;
  }
  img {
    width: 50px;
  }
  &:hover {
    border: 1px solid white;
  }
`;

function Pesquisa() {
  const [saboresPesquisados, setSaboresPesquisados] = useState([]);
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    const fetchSabores = async () => {
      try {
        const saboresDaApi = await getSabores();
        setSabores(saboresDaApi);
      } catch (error) {
        console.error('Erro ao obter sabores:', error.message);
      }
    };

    fetchSabores();
  }, []);

  return (
    <PesquisaConteiner>
      <Titulo>Já sabe seu sabor?</Titulo>
      <Subtitulo>Encontre seu sabor em nossa estante.</Subtitulo>
      <Input
        placeholder="Escreva seu sabor"
        onBlur={(evento) => {
          const textoDigitado = evento.target.value;
          const resultadoPesquisa = sabores.filter(sabor =>
            sabor.nome.toLowerCase().includes(textoDigitado.toLowerCase())
          );
          setSaboresPesquisados(resultadoPesquisa);
        }}
      />
      {saboresPesquisados.map((sabor) => (
        <Resultado key={sabor.id}>
          
          <p>{sabor.nome}</p>
        </Resultado>
      ))}
    </PesquisaConteiner>
  );
}

export default Pesquisa;
