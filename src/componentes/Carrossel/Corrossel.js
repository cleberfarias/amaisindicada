import React from 'react';
import { Carousel, Card, Button, Container } from 'react-bootstrap'; // Importando componentes do Bootstrap
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
import BannerImage1 from '../../imagens/bannerhome1.png'; // Exemplo de imagem do banner 1
import BannerImage2 from '../../imagens/bannerhome.png';  // Exemplo de imagem do banner 2

const CarrosselTitulo = styled.h2`
  width: 100%;
  padding: 10px 0;
  color: #EB9B00;
  font-weight: 700;
  font-size: 26px;
  text-align: center;
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

const Carrossel = () => {
  return (
    <div>
      {/* Carrossel de Banners */}
      <Carousel>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={BannerImage1}
            alt="Banner 1"
            style={{ height: '300px' }} // Ajustando a altura da imagem
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={BannerImage2}
            alt="Banner 2"
            style={{ height: '300px' }} // Ajustando a altura da imagem
          />
        </Carousel.Item>
      </Carousel>

      {/* Título da Coleção */}
      <CarrosselTitulo>Nossa coleção</CarrosselTitulo>

      {/* Carrossel da Coleção de Produtos */}
      <Carousel>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Banana}
            alt="Licor Banana"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Cacau}
            alt="Licor Cacau"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Maca}
            alt="Licor de Maçã Verde"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Amarula}
            alt="Licor Amarula"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={figo}
            alt="Licor Figo"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={groselha}
            alt="Licor Groselha"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Canela}
            alt="Licor Canela"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img
            className="d-block w-100"
            src={Morango}
            alt="Licor Morango"
            style={{ height: '300px' }}
          />
        </Carousel.Item>
      </Carousel>

      {/* Card de Destaque */}
      <Card className="my-4 text-center">
        <Card.Body>
          <img src={estrela} alt="Avaliação 5 Estrelas" className="mb-3" />
          <DescricaoTitulo>A Mais Escolhida</DescricaoTitulo>
          <DescricaoTituloLivro>Licor Fino de Chocolate e Morango</DescricaoTituloLivro>
          <DescricaoTexto>A bebida mais escolhida pelas mulheres...</DescricaoTexto>
          <Button href="/catálogo" variant="warning">
            Saiba mais
          </Button>
        </Card.Body>
        <Card.Img variant="bottom" src={MorangoECacau} alt="Licor Fino de Chocolate e Morango" />
      </Card>
    </div>
  );
};

export default Carrossel;
