import React, { useState } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg,#002f52 35%,#326589 165%);
`

const Button = styled.button`
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

function Sacola() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <AppContainer>
      <h1>Sacola de Compras</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.title} - R$ {item.price.toFixed(2)}</li>
        ))}
      </ul>
      {/* Renderize seu componente de catálogo aqui */}
      {/* Exemplo de botão de Comprar agora */}
      <Button onClick={() => addToCart({ title: 'Produto exemplo', price: 25.00 })}>
        Comprar agora
      </Button>
    </AppContainer>
  );
}

export default Sacola;
