import React from "react";
import styled from "styled-components";
import BarraDeBusca from "../componentes/BarraDeBusca/BarraDeBusca";
import './CatalagoHeader.css'


const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg,#002f52 35%,#326589 165%);
`


function Catalogo() {
  return (
    <AppContainer>
      <header className='cabecalhoCatalogo' style={{ background: '' }}>
        <div className='containerCatalolo' style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <BarraDeBusca />
        </div>
      </header>


    </AppContainer>
  );
}

export default Catalogo; 