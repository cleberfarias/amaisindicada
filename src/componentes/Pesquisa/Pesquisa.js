import styled from "styled-components";
import Input from "../Input/Input";
import { useState, useEffect } from "react";
import { getSabores } from "../../servicos/Sabores";
import { postFavorito } from "../../servicos/favoritos";

const PesquisaConteiner = styled.section`
  background-image: linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%);
  color: #FFF;
  text-align: center;
  padding: 50px 20px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Titulo = styled.h2`
  font-size: 36px;
  margin-bottom: 10px; /* Adicionei margem inferior */
`;

const Subtitulo = styled.h3`
  font-size: 16px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const Resultado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  p {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  img {
    width: 80px;
    margin-right: 10px;
  }
  &:hover {
    border: 1px solid white;
  }
`;

const StyledInput = styled(Input)`
  /* Estilos específicos para o Input */
  width: 100%; /* Ocupa a largura total do container pai */
  max-width: 400px; /* Define uma largura máxima para o input */
  margin-bottom: 20px; /* Adicionei margem inferior */
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

    if (textoDigitado === "") {
      // Recarrega a página quando o usuário apaga todo o conteúdo do input
      window.location.reload();
    }
  };

  return (
    <PesquisaConteiner>
      <Titulo>Já sabe seu sabor?</Titulo>
      <Subtitulo>Encontre seu sabor em nossa estante.</Subtitulo>
      <StyledInput
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
