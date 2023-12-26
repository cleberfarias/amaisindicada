import React, { useState } from 'react';
import styled from 'styled-components';
import IconesHeader from '../IconesHeader/IconesHeader';
import Prata from '../../imagens/prata.svg';
import Ouro from '../../imagens/ouro.svg';
import Maracuja from '../../imagens/maracuja.svg';
import banana from '../../imagens/banana.png'
import groselha from '../../imagens/groselha.png'
import coco from '../../imagens/coco.png'
import canela from '../../imagens/canela.png'
import figo from '../../imagens/figo.png'

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
  max-height: 200px; /* Defina o tamanho máximo desejado */
  width: auto; /* Mantém a proporção da imagem */
  margin-bottom: 0;
  padding: auto 0 10px;
`;

const Valor = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 1px;
`;

const IconesCatalago = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 1px;
  margin-bottom: 1px;
`;

const TextoCatalogo = styled.div`
  color: #EB9B00;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

function CarCatalogo({ title, image, price, onBuyNowClick }) {
  const handleBuyNowClick = () => {
    onBuyNowClick({ id: new Date().getTime(), title, image, price });
  };

  return (
    <Card>
      <div>
        <TextoCatalogo>{title}</TextoCatalogo>
        <ImgSabor src={image} alt={title} />
        <Valor>R$ {price.toFixed(2)}</Valor>
        <IconesCatalago><IconesHeader /></IconesCatalago>
        <Botao onClick={handleBuyNowClick}>Comprar agora</Botao>
      </div>
    </Card>
  );
}

function CardCatalogo() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const products = [
    {
      id: 1,
      title: 'Cachaça Prata',
      image: Prata,
      price: 25.00,
    },
    {
      id: 2,
      title: 'Cachaça Ouro',
      image: Ouro,
      price: 25.00,
    },
    {
      id: 3,
      title: 'Licor Maracuja',
      image: Maracuja,
      price: 25.00,
    },
    {
      id: 4,
      title: 'Licor Banana',
      image: banana,
      price: 25.00,
    },{
      id: 5,
      title: 'Licor Groselha',
      image: groselha,
      price: 25.00,
    },{
      id: 6,
      title: 'Licor Coco',
      image: coco,
      price: 25.00,
    },{
      id: 7,
      title: 'Licor Canela',
      image: canela,
      price: 25.00,
    },{
      id: 8,
      title: 'Licor Figo',
      image: figo,
      price: 25.00,
    },
    // Adicione mais produtos conforme necessário
  ];

  return (
    <CarContainer>
      {products.map(product => (
        <CarCatalogo
          key={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          onBuyNowClick={addToCart}
        />
      ))}
    </CarContainer>
  );
}

export default CardCatalogo;
