import styled from 'styled-components';
import { Titulo } from '../Titulo/Titulo';
import Coleaco from '../../imagens/colecao 1.svg';
import { Link } from 'react-router-dom';

const Card = styled.div`
  align-items: center;
  background-color: #FFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  width: 100%;
  
  @media screen and (min-width: 768px) {
    flex-direction: row;
    margin: 10px auto;
    max-width: 600px;
  }
`;

const Botao = styled(Link)`
  background-color: #EB9B00;
  color: #FFF;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  font-weight: 900;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  
  &:hover {
    background-color: #FFA500;
  }
`;

const Descricao = styled.p`
  color: #002F52;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    text-align: left;
    margin-top: 0;
  }
`;

const Subtitulo = styled.h4`
  color: #002F52;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;

  @media screen and (min-width: 768px) {
    font-size: 18px;
    text-align: left;
  }
`;

const ImgSabor = styled.img`
  max-width: 100%;
  height: auto;

  @media screen and (min-width: 768px) {
    max-width: 250px;
  }
`;

function CardRecomenda({ titulo, subtitulo, descricao }) {
  return (
    <Card>
      <div>
        <Titulo alinhamento="center">{titulo}</Titulo>
        <Subtitulo>{subtitulo}</Subtitulo>
        <Descricao>{descricao}</Descricao>
        <Botao to='/catálogo'>Saiba mais</Botao>
      </div>
      <div> 
        <ImgSabor src={Coleaco} alt={titulo}/>
      </div>
    </Card>  
  );
}

export default CardRecomenda;
