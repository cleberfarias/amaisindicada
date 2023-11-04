
import styled from 'styled-components';
import Pesquisa from './componentes/Pesquisa/Pesquisa';
import Header from './componentes/Header/Header';
import Footer from './componentes/Footer/Footer';
import Rodape from './componentes/Rodape/Rodape';
import UltimosLancamentos from './componentes/UltimosLancamentos/UltimosLancamento';




const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(90deg, #d4e6f4 50%, #328955);
  
`

function App() {
  return (
    <AppContainer>
      <Header/>
      <UltimosLancamentos/>
      <Pesquisa/>
      <Footer/>   
      <Rodape/>
     </AppContainer>
    
    

    );
    

}

export default App;
