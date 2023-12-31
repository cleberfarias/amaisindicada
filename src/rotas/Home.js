import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa/Pesquisa';
import Footer from '../componentes/Footer/Footer';
import Rodape from '../componentes/Rodape/Rodape';
import UltimosLancamentos from '../componentes/UltimosLancamentos/UltimosLancamento';
import Carrossel from '../componentes/Carrossel/Corrossel';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
  overflow-x: hidden; /* Evita a barra de rolagem horizontal */

  @media (max-width: 768px) {
    /* Adapte o estilo para telas menores */
  }
`;

function Home() {
  return (
    <AppContainer>
      <Carrossel />
      <UltimosLancamentos />
      <Pesquisa />
      <Footer />
      <Rodape />
    </AppContainer>
  );
}

export default Home;
