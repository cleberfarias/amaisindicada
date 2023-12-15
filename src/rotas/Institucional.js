import React from "react";
import styled from "styled-components";
import './Institucional.css';
import Rodape from "../componentes/Rodape/Rodape";
import Footer from "../componentes/Footer/Footer";
import Producao1 from "../imagens/produca4.png.jpg";
import Producao2 from "../imagens/producao3.jpg";
import Producao3 from "../imagens/carvalho.jpg";

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: linear-gradient(90deg, #002f52 35%, #326589 165%);
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 100%;
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: center;
`;
const ImageContainer = styled.div`
  display: flex;
  gap: 20px; /* Espaçamento entre as imagens */
  justify-content: center; /* Centralizar a imagem horizontalmente */
  align-items: center; /* Centralizar a imagem verticalmente */
  margin-top: 20px; /* Adicionar espaço entre o texto e a imagem */
`;

const Image = styled.img`
  width: 320px;
  height: 320px;
  object-fit: cover;
  
`;


function Institucional() {
    return (
        <AppContainer>
            <header>
                <ContentContainer>
                    <TextContainer>
                        <h2 className='insitucional__titulo'>Bem-vindo ao site da Cachaça<b> A Mais Indicada!</b></h2>
                        <h3 className='texto__institucional'>
                            <p>Nossa cachaça é produzida de maneira artesanal na encantadora cidade
                                de Celso
                                Ramos, situada em Santa Catarina. Aqui, a tradição e a paixão pela
                                produção de
                                cachaça estão enraizadas<br /> em nossa família, os Pelozato, há gerações.

                                Fundada por Roberson Pelozato e Iziario Pelozato, membros da família
                                Pelozato, a Cachaça A Mais Indicada representa o compromisso de criar<br />
                                uma bebida de alta qualidade, preservando a autenticidade e os métodos
                                artesanais que garantem seu sabor único.</p>

                            <p>Nossos fundadores são verdadeiros conhecedores da arte da destilação,
                                utilizando técnicas tradicionais transmitidas de geração em geração.
                                Cada etapa do processo de<br /> produção é cuidadosamente supervisionada para
                                garantir que nossa cachaça atinja os mais altos padrões de excelência.

                                O segredo de nossa cachaça reside em nossos ingredientes selecionados<br /> e na
                                atenção meticulosa aos detalhes durante o processo de produção. Utilizamos
                                apenas cana-de-açúcar de qualidade superior, cultivada localmente em nossas
                                terras, garantindo a riqueza<br /> de sabores e aromas em cada gole.</p>

                            <p>Além disso, a Cachaça A Mais Indicada é envelhecida em tonéis de madeira
                                especial, permitindo que os sabores se desenvolvam e se aperfeiçoem ao longo do tempo.
                                O resultado é uma<br /> bebida suave, equilibrada e cheia de personalidade, que agrada aos paladares
                                mais exigentes.

                                Nossa cachaça é o reflexo do amor que temos por nossa região e tradição.
                                Cada garrafa é produzida <br />com carinho e dedicação, e estamos orgulhosos de
                                compartilhar essa paixão com você.</p>

                            <p>Em nosso site, você encontrará informações detalhadas sobre nossos produtos,
                                desde os diferentes tipos de cachaça que oferecemos até sugestões de como
                                apreciá-la da melhor maneira<br /> possível. Também compartilharemos receitas
                                exclusivas de coquetéis que destacam as nuances e sabores de nossa
                                cachaça.</p>




                        </h3>
                        <ImageContainer>
                            <Image className="imagem__producao" src={Producao1} alt="foto do alambique" />
                            <Image className="imagem__producao" src={Producao2} alt="foto do alambique" />
                            <Image className="imagem__producao" src={Producao3} alt="foto do alambique" />
                        </ImageContainer>
                        <h4 className='texto__agradecimento'> Agradecemos por visitar o site da Cachaça A Mais Indicada e convidamos
                            você a experimentar a riqueza de nossa cachaça artesanal. Esteja preparado
                            para uma experiência única e inesquecível<br /> que celebra a tradição familiar e
                            a paixão pela cachaça.</h4>
                    </TextContainer>

                </ContentContainer>
            </header>
            <Footer />
            <Rodape />
        </AppContainer>
    );
}

export default Institucional;
