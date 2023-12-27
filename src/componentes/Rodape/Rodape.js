import React from 'react';
import styled from 'styled-components';

const RodapeStyled = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  gap: 16px;
  padding: 10px; /* Aumentei o padding para maior espaçamento interno */
  color: white; /* Alterei a cor do texto para branco */
  background-color: #22778b;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.8rem; /* Ajustei o tamanho da fonte */
  font-weight: 400;
`;

function Rodape() {
  return <RodapeStyled>Desenvolvido por Cleber Delgado.</RodapeStyled>;
}

export default Rodape;
