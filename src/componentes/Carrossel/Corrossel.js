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
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CarrosselTitulo = styled.h2`
  width: 100%;
  padding: 10px 0;
  color: #EB9B00;
  font-weight: 700;
  font-size: 26px;
  text-align: center;
`;

const CarrosselContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFF;
  box-shadow: 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin: 1em;
  padding: 1em;
  max-width: 300px;
  text-align: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    max-width: 600px;
  }
`;

const DescricaoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;

  @media screen and (min-width: 768px) {
    text-align: left;
  }
`;

const DescricaoTitulo = styled.h3`
  color: #EB9B00;
  font-weight: 700;
  font-size: 22px;
  margin: 10px auto;
`;

const DescricaoTituloLivro = styled.h2`
  color: #328955;
  font-size: 16px;
  font-weight: 700;
  margin: 5px auto;
`;

const DescricaoTexto = styled.p`
  font-size: 14px;
  color: #002F52;
  font-size: 16px;
  font-weight: bold;
  margin: 10px auto;
`;

const DescricaoImagem = styled.img`
  max-width: 100%;
  height: auto;
  margin: 10px auto;
`;

const BotoesAncora = styled.a`
  background-color: #EB9B00;
  color: #FFF;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  font-weight: 900;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  
  &:hover {
    background-color: #FFA500;
  }
`;

function Carrossel() {
  return (
    <CarrosselSection>
      <CarrosselTitulo>Nossa coleção</CarrosselTitulo>

      <CarrosselContainer>
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          <SwiperSlide><img src={Banana} alt="Licor Banana" /></SwiperSlide>
          <SwiperSlide><img src={Cacau} alt="Licor Cacau" /></SwiperSlide>
          <SwiperSlide><img src={Maca} alt="Licor de Maçã Verde" /></SwiperSlide>
          <SwiperSlide><img src={Amarula} alt="Licor Amarula" /></SwiperSlide>
          <SwiperSlide><img src={figo} alt="Licor figo" /></SwiperSlide>
          <SwiperSlide><img src={groselha} alt="Licor Groselha" /></SwiperSlide>
          <SwiperSlide><img src={Canela} alt="Licor Canela" /></SwiperSlide>
          <SwiperSlide><img src={Morango} alt="Licor Morango" /></SwiperSlide>
        </Swiper>
      </CarrosselContainer>

      <Card>
        <DescricaoContainer>
          <img src={estrela} alt="Avaliação 5 Estrelas" />
          <DescricaoTitulo>A Mais Escolhida</DescricaoTitulo>
          <DescricaoTituloLivro>Licor Fino de Chocolate e Morango</DescricaoTituloLivro>
          <DescricaoTexto>A bebida mais escolhida pelas mulheres...</DescricaoTexto>
          <BotoesAncora href='/catálogo'>Saiba mais</BotoesAncora>
        </DescricaoContainer>
        <DescricaoImagem src={MorangoECacau} alt="Licor Fino de Chocolate e Morango" />
      </Card>
    </CarrosselSection>
  );
}

export default Carrossel;
