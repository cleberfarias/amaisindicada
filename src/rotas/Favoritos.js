
import styled from 'styled-components';
import Pesquisa from '../componentes/Pesquisa/Pesquisa';
import Footer from '../componentes/Footer/Footer';
import Rodape from '../componentes/Rodape/Rodape';
import UltimosLancamentos from '../componentes/UltimosLancamentos/UltimosLancamento';
import Carrossel from '../componentes/Carrossel/Corrossel';




const AppContainer = styled.div`
    
`

function Favoritos() {
  return (
    <AppContainer>
      <Pesquisa/>
      <Footer/>   
      <Rodape/>
     </AppContainer>
    
    

    );
    

}

export default Favoritos;
