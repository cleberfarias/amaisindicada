import styled from 'styled-components';
import Formulario from '../componentes/Formulário/Formulario';
import Header from '../componentes/Header/Header';
import Footer from '../componentes/FooterOpcoes/FooterOpcoes';

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right, #663300, #ffffff);
  padding: 20px; /* Adicione algum preenchimento geral */
`;

function FaleConosco() {
  
  return (
    <div>
      <Header/>
      <AppContainer>
      
      <Formulario/>      
    </AppContainer>
    <Footer/>
    </div>
   
  );
}


export default FaleConosco;
