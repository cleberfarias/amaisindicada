import React, { useState } from 'react';
import styled from 'styled-components';
import IconesHeader from '../IconesHeader/IconesHeader';
import Prata from '../../imagens/prata.svg';
import Ouro from '../../imagens/ouro.svg';
import Maracuja from '../../imagens/maracuja.svg';

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
  margin-bottom: 1px;
`;

const TextoCatalogo = styled.div`
  color: #EB9B00;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
`;

function ProductCard({ title, image, price, onBuyNowClick }) {
  const handleBuyNowClick = () => {
    onBuyNowClick({ title, image, price });
  };

  return (
    <Card>
      <div>
        <TextoCatalogo>{title}</TextoCatalogo>
        <ImgSabor src={image} alt={title} />
        <Valor>R$ {price.toFixed(2)}</Valor>
        <InconesCatalago><IconesHeader /></InconesCatalago>
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
    // Adicione mais produtos conforme necessário
  ];

  return (
    <CarContainer>
      {products.map(product => (
        <ProductCard
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