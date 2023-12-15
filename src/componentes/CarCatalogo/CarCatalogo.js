import styled from 'styled-components';
import Prata from '../../imagens/prata.svg';
import Ouro from '../../imagens/ouro.svg';
import IconesHeader from '../IconesHeader/IconesHeader';


const CarContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Card = styled.div`
    align-items: center;
    background-color: #FFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    max-width: 300px;
    padding: 5px 5px 5px;
`;

const Botao = styled.button`
    background-color: #EB9B00;
    color: #FFF;
    padding: 5px 0;
    font-size: 14px;
    border-radius: 15px;
    font-weight: 900;
    cursor: pointer;
    text-decoration: none;
    width: 100%;
    margin-top: 5px;
`;



const ImgSabor = styled.img`
    max-height: 300px;
    margin-bottom: 0;
    padding: auto 0 10px ;
`;

const Valor = styled.p`
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-top: 1px;
`;

const InconesCatalago = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 1px;
    margin-bottom: 1px;  /* Ajustei o margin-bottom para reduzir a distância */
`;
const TextoCatalogo = styled.div`
color: #EB9B00;
font-size: 16px;
font-weight: bold;
margin: 10px 0;
text-align: center;
`

function CardCatalogo() {
  return (
    <CarContainer>
      <Card>
        <div>
          <TextoCatalogo>Cachaça Prata</TextoCatalogo>
          <ImgSabor src={Prata} />
          <Valor>R$ 25,00</Valor>
          <InconesCatalago><IconesHeader /></InconesCatalago>
          
          
        </div>
      </Card>
      <Card>
        <div>
          <ImgSabor src={Ouro} />
          <Valor>R$ 25,00</Valor>
          <Botao href="#">Saiba mais</Botao>
        </div>
      </Card>
    </CarContainer>
  );
}

export default CardCatalogo;
