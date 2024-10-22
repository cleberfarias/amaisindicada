import React from "react";
import styled from "styled-components";
import Iziario from "../imagens/IZIÁRIO 1 (2).png";
import MarizeteIziario from "../imagens/Marizete e Iziario (1) 1.png";
import familia from "../imagens/Familia completa (2) 1.png";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Header from "../componentes/Header/Header";
import Geral from "../imagens/Geral (2) 1.png";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: justify;
  max-width: 80%; /* Ocupa toda a largura disponível */
  padding: 0 20px; /* Adiciona um espaçamento nas laterais */
  box-sizing: border-box; /* Garante que o padding não aumente o tamanho total */
`;

const Titulo = styled.h2`
  width: 100%;
  padding: 30px 0;
  color: #505050;
  font-size: 32px;
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
`;

const TextoInstitucional = styled.h3`
  width: 100%;
  padding: 20px;
  font-size: 20px;
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: regular;
  color: #505050;
  text-align: justify;
  margin: 0 auto;
  flex: 1;
`;
const TextoDestaque = styled.h3`
  width: 100%;
  padding: 20px;
  font-size: 18px;
  color: #505050;
  font-family: 'PT Sans Caption', sans-serif;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  flex: 1;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between; /* Distribui as imagens pelo espaço disponível */
  align-items: center; /* Alinha as imagens verticalmente */
  margin-top: 20px;
  padding: 0 20px; /* Adiciona um espaçamento nas laterais */
  max-width: 1200px; /* Define uma largura máxima para o container */
  margin: 0 auto; /* Centraliza o container na página */
`;

const Image = styled.img`
  width: 20%;
  max-width: 20%; /* Alterado para 100% para permitir que as imagens diminuam conforme a tela */
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;
   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Sombra suave */


  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Aumenta a sombra no hover */
  }
`;

function Institucional() {
  return (
    <div>
      <Header />
      <AppContainer>
        <ContentContainer>
          <TextContainer>
            <Titulo>Bem-vindo ao site da Cachaça<b> A Mais Indicada!</b></Titulo>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image className="imagem__producao" src={Iziario} alt="foto do alambique" />
              <TextoInstitucional>
                <p>E foi lá em 2004, na comunidade de Nossa Senhora do Caravaggio em Celso Ramos-SC, 
                  através do Seu Iziário que a história da A Mais Indicada começou!.</p>
              </TextoInstitucional>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextoInstitucional>
                <p>Com a necessidade de aperfeiçoamento, Iziário Pelozato realizou um 
                  curso para aprender um pouco mais do processo da cachaça. Dona Marizete, 
                  sua companheira, 
                    acompanhou-o na ideia trazendo a doçura e inventando sabores para dar 
                    vida aos licores. O primeiro licor foi o de figo.
                    Fazendo primeiramente para o consumo e os vizinhos tomarem, a notícia da 
                    boa cachaça se espalhou no município conhecido como Terra da Cana-de-Açúcar e a freguesia foi chegando… 
                </p>
              </TextoInstitucional>
              <Image className="imagem__producao" src={MarizeteIziario} alt="foto do alambique" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image className="imagem__producao" src={familia} alt="foto do alambique" />
              <TextoInstitucional>
                <p>Roberson Pelozato, filho do casal, decidiu ampliar as vendas e criar uma 
                  nova cara sem deixar suas raízes. O nome A MAIS INDICADA surgiu quando os 
                  próprios clientes passavam pela região e pediam a indicação de uma boa 
                  cachaça, como a população estava acostumada com a cachaça do Iziário, 
                  prontamente a indicavam, 
                  e assim acabou se tornando A Mais Indicada Cachaça de Celso Ramos.</p>
              </TextoInstitucional>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextoInstitucional>
                <p>Cada produto é desenvolvido com carinho e dedicação pela nossa família, pensando 
                  sempre no melhor para você e sua família. A Mais Indicada conta com licores cremosos e 
                  finos, além da tradicional cachaça e aquelas envelhecidas em barris. Juntos, estamos 
                  criando histórias, compartilhando momentos e construindo um futuro feliz. 
                </p>
              </TextoInstitucional>
              <Image className="imagem__producao" src={Geral} alt="foto do alambique" />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextoDestaque>
                <p>A Mais Indicada é mais do que uma marca de bebidas, é uma celebração à cultura, à 
                  tradição e ao prazer de brindar os momentos especiais da vida. Queremos que cada dose 
                  represente a paixão que colocamos em nossa produção e que, ao saborear nossos produtos, você sinta a dedicação que transforma simples ingredientes em verdadeiras obras-primas.
                    Seja em festas, encontros ou momentos de descanso, A Mais Indicada estará sempre ao seu 
                    lado, tornando cada brinde inesquecível.
</p>
              </TextoDestaque>
            </div>
            <Titulo>Galeria<b> A Mais Indicada!</b></Titulo>
            <ImageContainer>
              <Image className="imagem__producao" src={require("../imagens/EXP12.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP3.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP1.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP2.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP4.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP7.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP9.jpg")} alt="foto do alambique" />
              <Image className="imagem__producao" src={require("../imagens/EXP10.jpg")} alt="foto do alambique" />
            </ImageContainer>
          </TextContainer>
        </ContentContainer>
      </AppContainer>
      <Footer />
    </div>
  );
}

export default Institucional;
