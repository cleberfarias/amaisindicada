import styled from 'styled-components';
import UltimosLancamentos from '../componentes/UltimosLancamentos/UltimosLancamento';
import Carrossel from '../componentes/Carrossel/Corrossel';
import Header from '../componentes/Header/Header';
import Footer from '../componentes/FooterOpcoes/FooterOpcoes';

const AppContainer = styled.div`

  width: 100%; /* Define a largura como 100% para preencher toda a largura da página */
  min-height: 100vh; /* Define a altura mínima como 100% da altura da tela */
  overflow-x: hidden; /* Evita a barra de rolagem horizontal */
  display: flex; /* Usa o modelo de layout flexível */
  flex-direction: column; /* Organiza os elementos em uma coluna */
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
