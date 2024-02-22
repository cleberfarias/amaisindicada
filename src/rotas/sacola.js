import React, { useState } from 'react';
import styled from 'styled-components';
import CarCatalogo from '../componentes/CarCatalogo/CardCatalogo';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right, #663300, #ffffff);
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



function Sacola() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, { ...product }]); // Copiar o produto antes de adicionar ao carrinho
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
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
          onBuyNowClick={() => addToCart(product)}
          onRemoveClick={() => removeFromCart(product.id)}
        />
      ))}
    </AppContainer>
  );
}


export default Sacola;
