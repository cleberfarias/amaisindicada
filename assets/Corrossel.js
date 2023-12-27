import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import Banana from '../../imagens/banana.svg';
import Cacau from '../../imagens/cacau.svg';
import Maca from '../../imagens/Maça.svg';
import Amarula from '../../imagens/amarula.svg';
import figo from '../../imagens/figo.svg';
import groselha from '../../imagens/groselha.svg';
import Canela from '../../imagens/Canela.svg';
import Morango from '../../imagens/morango.svg';
import estrela from '../../imagens/Estrelinhas.svg';
import MorangoECacau from '../../imagens/MorangoCacau.svg';

const CarrosselSection = styled.section`
  background-image: linear-gradient(97.54deg, #002F52 35.49%, #326589 165.37%);
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 2100px;
`;

const CarrosselTitulo = styled.h2`
  width: 100%;
  padding: 30px 0;
  background-color: #FFF;
  color: #EB9B00;
  font-size: 16px;
  text-align: center;
  margin: 0 auto;
`;

const CarrosselContainer = styled.div`
  display: flex;
`;

const Card = styled.div`
  background: #FFF;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 1em;
  padding: 1em;
  margin: 0 auto;
  max-width: 1100px;
`;

const DescricaoTitulo = styled.h3`
  color: #EB9B00;
  font-weight: 700;
  font-size: 26px;
  margin: 0 auto;
`;

const DescricaoTituloLivro = styled.h2`
  color: #328955;
  font-size: 18px;
  font-weight: 700;
  margin: 0.5em 0;
`;

const DescricaoTexto = styled.p`
  font-size: 14px;
  max-width: 300px;
  color: #002F52;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;
`;

const DescricaoImagem = styled.img`
  max-height: 200px;
  margin: 0 auto;
`;

const BotoesAncora = styled.a`
  background-color: #EB9B00;
  color: #FFF;
  padding: 10px 0px;
  font-size: 16px;
  border-radius: 20px;
  font-weight: 900;
  display: block;
  text-align: center;
  width: 150px;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

function Carrossel() {
  return (
    <CarrosselSection className="carrossel">
      <CarrosselTitulo className="carrossel__titulo">Nossa coleção</CarrosselTitulo>

      <CarrosselContainer className="carrossel__container">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <img src={Banana} alt="Licor Banana" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Cacau} alt="Licor Cacau" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Maca} alt="Licor de Maçã Verde" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Amarula} alt="Licor Amarula" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={figo} alt="Licor figo" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={groselha} alt="Licor Groselha" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Canela} alt="Licor Canela" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Morango} alt="Licor Morango" />
          </SwiperSlide>
        </Swiper>

        <Card className="card">
          <div className="card__descrição">
            <div className="descrição">
              <img src={estrela} alt="Avaliação 5 Estrelas" />
              <DescricaoTitulo className="descrição__titulo">A Mais escolhida</DescricaoTitulo>
              <DescricaoTituloLivro className="descrição__titulo-livro">Licor Fino de chocolate e Morango</DescricaoTituloLivro>
              <DescricaoTexto className="descrição__texto">A Bebida mais escolhida pelas as mulheres...</DescricaoTexto>
            </div>
            <DescricaoImagem src={MorangoECacau} className="dercrição__imagem" />
          </div>
          <div className="card__botões">
            <BotoesAncora href='/catálogo' className="botões__ancora">Saiba mais</BotoesAncora>
          </div>
        </Card>
      </CarrosselContainer>
    </CarrosselSection>
  );
}

export default Carrossel;
