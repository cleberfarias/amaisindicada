import React, { useState } from 'react';
import styled from 'styled-components';
import CarCatalogo from '../componentes/CarCatalogo/CarCatalogo';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165.37%);
  position: relative;
  padding: 20px; /* Adicione algum preenchimento geral */
`;

const NumeroSacola = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #EB9B00;
  color: #FFF;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  z-index: 1;
`;

const ExemploDados = [
  {
    id: 1,
    title: 'Produto 1',
    image: 'url_da_imagem_1.jpg',
    price: 20.99,
  },
  {
    id: 2,
    title: 'Produto 2',
    image: 'url_da_imagem_2.jpg',
    price: 15.49,
  },
  // Adicione mais produtos conforme necessário
];

function Sacola() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <AppContainer>
      <NumeroSacola>{cart.length}</NumeroSacola>
      {/* Renderiza a lista de produtos na sacola */}
      {ExemploDados.map((product) => (
        <CarCatalogo
          key={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          onBuyNowClick={() => addToCart(product)}
        />
      ))}
    </AppContainer>
  );
}

export default Sacola;
