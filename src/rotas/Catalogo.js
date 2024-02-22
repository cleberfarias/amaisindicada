import React from "react";
import styled from "styled-components";
import CardCatalogo from "../componentes/CarCatalogo/CardCatalogo.js";

const CatalogoHeader = styled.div`
  position: fixed;
  width: 100%;
`;

const CatalogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column; /* Ajuste o layout para coluna em telas menores */
  }
`;

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh; /* Adicione uma altura mínima para ocupar toda a tela */
  display: flex;
  background: linear-gradient(to right, #663300, #ffffff);
  padding: 20px 5px 20px;
`;

function Catalogo() {
  return (
         
        <CardCatalogo/>
      
    
  );
}

export default Catalogo;
