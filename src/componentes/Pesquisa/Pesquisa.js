import styled from "styled-components";
import Input from "../Input/Input";
import { useState, useEffect } from "react";
import { getSabores } from "../../servicos/Sabores";
import { postFavorito } from "../../servicos/favoritos";



const PesquisaConteiner = styled.section`
  background-image: linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%);
  color: #FFF;
  text-align: center;
  padding: 85px 0;
    height: 470px;
    width: 100%;
`;

const Titulo = styled.h2`
  color: #FFF;
  font-size: 36px;
  text-align: center;
  width: 100%;
  
`;

const Subtitulo = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
  
`;

const Resultado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  p {
    width: 200px;
  }
  img {
    width: 100px;
  }
  &:hover {
    border: 1px solid white;
  }
`;


function Pesquisa() {
  const [saboresPesquisados, setSaboresPesquisados] = useState([]);
  const [sabores, setSabores] = useState([]);

  useEffect(() => {
    fetchBebidas();
  }, []);

  async function fetchBebidas() {
    const bebidasDaApi = await getSabores();
    setSabores(bebidasDaApi);
  }

  async function insereFavorito(id) {
    await postFavorito(id);
    alert(`Bebida de id:${id}`);
  }

  const handleInputBlur = (evento) => {
    const textoDigitado = evento.target.value;
    const resultadoPesquisa = sabores.filter((sabor) =>
      sabor.nome.toLowerCase().includes(textoDigitado.toLowerCase())
    );
    setSaboresPesquisados(resultadoPesquisa);
  };

  const handleInputChange = (evento) => {
    const textoDigitado = evento.target.value;

    if (textoDigitado === '') {
      // Recarrega a página quando o usuário apaga todo o conteúdo do input
      window.location.reload();
    }
  };

  return (
    <PesquisaConteiner>
      <Titulo>Já sabe seu sabor?</Titulo>
      <Subtitulo>Encontre seu sabor em nossa estante.</Subtitulo>
      <Input
        placeholder="Escreva seu sabor"
        onBlur={handleInputBlur}
        onInput={handleInputChange}
      />
      {saboresPesquisados.map((sabor) => (
        <Resultado onClick={() => insereFavorito(sabor.id)} key={sabor.id}>
          <img src={sabor.src} alt={sabor.nome} />
          <p>{sabor.nome}</p>
        </Resultado>
      ))}
    </PesquisaConteiner>
  );
}

export default Pesquisa;
