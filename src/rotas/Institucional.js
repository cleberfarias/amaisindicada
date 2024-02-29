import React from "react";
import styled from "styled-components";
import Producao1 from "../imagens/produca4.png.jpg";
import Producao2 from "../imagens/producao3.jpg";
import Producao3 from "../imagens/carvalho.jpg";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Header from "../componentes/Header/Header";





const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(to right, #663300, #ffffff);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: justify;
  max-width: 800px; /* Ajuste o valor conforme necessário */
`;

const Titulo = styled.h2`
  width: 100%;
  padding: 30px 0;
  color: #000000;
  font-size: 36px;
  text-align: center;
  margin: 0 auto;
  
`;

const TextoInstitucional = styled.h3`
  width: 100%;
  padding: 30px 0;
  font-weight: 200;
  color: white;
  font-size: 25px;
  text-align: justify;
  margin: 0 auto;
  flex: 1;
  ;
`;

const TextoAgradecimento = styled.h4`
  width: 100%;
  padding: 30px 0;
  color: #EB9B00;
  font-size: 18px;
  text-align: center;
  margin: 0 auto;
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
  width: 100%;
  max-width: 320px;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease; /* Adiciona uma transição suave para a transformação */
  cursor: pointer;

  &:hover {
    transform: scale(1.05); /* Aumenta ligeiramente o tamanho da imagem ao passar o mouse */
  }
`;

function Institucional() {
  return (
    <div>
      <Header />
      <AppContainer>
        <header>
          <ContentContainer>
            <TextContainer>
              <Titulo>Bem-vindo ao site da Cachaça<b> A Mais Indicada!</b></Titulo>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image className="imagem__producao" src={Producao1} alt="foto do alambique" />
                <TextoInstitucional>
                  <p>Nossa cachaça é produzida de maneira artesanal na encantadora cidade
                    de Celso Ramos, situada em Santa Catarina. Aqui, a tradição e a paixão pela
                    produção de cachaça estão enraizadas em nossa família, os Pelozato.</p>
                </TextoInstitucional>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextoInstitucional>
                  <p>Nossos fundadores são verdadeiros conhecedores da arte da destilação,
                    utilizando técnicas tradicionais. Cada etapa do processo de produção é cuidadosamente
                    supervisionada para garantir que nossa cachaça atinja os mais altos padrões de excelência.</p>
                </TextoInstitucional>
                <Image className="imagem__producao" src={Producao2} alt="foto do alambique" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image className="imagem__producao" src={Producao3} alt="foto do alambique" />
                <TextoInstitucional>
                  <p>Além disso, a Cachaça A Mais Indicada é envelhecida em tonéis de madeira especial,
                    permitindo que os sabores se desenvolvam e se aperfeiçoem ao longo do tempo. O resultado é uma
                    bebida suave, equilibrada e cheia de personalidade, que agrada aos paladares mais exigentes.</p>
                </TextoInstitucional>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextoInstitucional>
                  <p>Em nosso site, você encontrará informações detalhadas sobre nossos produtos, desde os diferentes tipos de cachaça que oferecemos até sugestões de como
                    apreciá-la da melhor maneira possível.</p>
                </TextoInstitucional>
                <Image className="imagem__producao" src={require("../imagens/EXP1.jpg")} alt="foto do alambique" />
              </div>
              <Titulo>Galeria<b> A Mais Indicada!</b></Titulo>
              <ImageContainer>
                <Image className="imagem__producao" src={require("../imagens/EXP3.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP1.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP2.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP4.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP7.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP9.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP10.jpg")} alt="foto do alambique" />
                <Image className="imagem__producao" src={require("../imagens/EXP12.jpg")} alt="foto do alambique" />

              </ImageContainer>
            </TextContainer>

          </ContentContainer>
        </header>
      </AppContainer>
      <Footer />
    </div>

  );
}


export default Institucional;
