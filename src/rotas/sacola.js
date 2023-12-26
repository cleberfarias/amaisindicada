import React, { useState } from 'react';
import styled from 'styled-components';
import CarCatalogo from '../componentes/CarCatalogo/CarCatalogo';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165.37%);
  position: relative;
`;

const NumeroSacola = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #EB9B00;
  color: #FFF;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Sacola() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <AppContainer>
      <NumeroSacola>{cart.length}</NumeroSacola>
      {/* Renderiza a lista de produtos na sacola */}
      {cart.map((product) => (
        <CarCatalogo
          key={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          onBuyNowClick={addToCart}
        />
      ))}
    </AppContainer>
  );
}

export default Sacola;
