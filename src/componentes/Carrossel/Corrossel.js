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
background: linear-gradient(to right, #663300, #ffffff);
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: auto;
  max-width: 100%;
`;

const CarrosselTitulo = styled.h2`
  width: 100%;
  padding: 10px 0;
  background-color: #FFF;
  color: #EB9B00;
  font-weight: 700;
  font-size: 26px;
  text-align: center;
  margin: 0 auto;
`;

const CarrosselContainer = styled.div`
  display: flex;
  max-width: 800px;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;

const Card = styled.div`
  display: flex;
  background: #FFF;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 1em;
  padding: 1em;
  margin: 0 auto;
  max-width: 1100px;
  text-align: center;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const DescricaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const DescricaoTitulo = styled.h3`
  color: #EB9B00;
  font-weight: 700;
  font-size: 26px;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`;

const DescricaoTituloLivro = styled.h2`
  color: #328955;
  font-size: 18px;
  font-weight: 700;
  margin: 0.5em 0;

  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;

const DescricaoTexto = styled.p`
  font-size: 14px;
  max-width: 300px;
  color: #002F52;
  font-size: 18px;
  font-weight: bold;
  margin: 0 auto;

  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;

const DescricaoImagem = styled.img`
  max-height: 250px;
  width: 50%;

  @media screen and (min-width: 768px) {
    max-height: none;
    width: auto;
  }
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
  margin-top: 10px;

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
          spaceBetween={1}
          slidesPerView={3}
          centeredSlides
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
      </CarrosselContainer>

      <Card className="card">
        <DescricaoContainer>
          <div className="descrição">
            <img src={estrela} alt="Avaliação 5 Estrelas" />
            <DescricaoTitulo className="descrição__titulo">A Mais escolhida</DescricaoTitulo>
            <DescricaoTituloLivro className="descrição__titulo-livro">Licor Fino de chocolate e Morango</DescricaoTituloLivro>
            <DescricaoTexto className="descrição__texto">A Bebida mais escolhida pelas mulheres...</DescricaoTexto>
          </div>
          <BotoesAncora href='/catálogo' className="botões__ancora">Saiba mais</BotoesAncora>
        </DescricaoContainer>
        <DescricaoImagem src={MorangoECacau} className="dercrição__imagem" />
      </Card>
    </CarrosselSection>
  );
}

export default Carrossel;
