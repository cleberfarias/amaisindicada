import React from "react";
import styled from "styled-components";
import './CatalagoHeader.css'
import CardCatalogo from "../componentes/CarCatalogo/CarCatalogo";


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-image: linear-gradient(90deg,#002f52 35%,#326589 165%);
  padding: 20px 5px 20px;
  `


function Catalogo() {
  return (
    <AppContainer>
          
          
          <div>
            <CardCatalogo/>
          </div>
          
          
      
    
   
    </AppContainer>
    
  );
}

export default Catalogo; 