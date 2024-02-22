import styled from 'styled-components';
import UltimosLancamentos from '../componentes/UltimosLancamentos/UltimosLancamento';
import Carrossel from '../componentes/Carrossel/Corrossel';
import Header from '../componentes/Header/Header';
import Footer from '../componentes/FooterOpcoes/FooterOpcoes';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right, #663300, #ffffff);
  overflow-x: hidden; /* Evita a barra de rolagem horizontal */

  @media (max-width: 768px) {
    /* Adapte o estilo para telas menores */
  }
`;

function Home() {
  return (
    <div>
    <Header/>
    <AppContainer>
      
      <Carrossel />
      <UltimosLancamentos />
    </AppContainer>
    <Footer/>
    </div>
  
  );
}

export default Home;
