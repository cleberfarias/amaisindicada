import React from 'react';
import { Carousel, Card, Button, Container } from 'react-bootstrap'; // Importando componentes do Bootstrap
import styled, { keyframes } from 'styled-components';  

import Banana from '../../imagens/banana.svg';
import Cacau from '../../imagens/cacau.svg';
import Maca from '../../imagens/verde.svg';
import Amarula from '../../imagens/amburana.svg';
import figo from '../../imagens/figo.svg';
import groselha from '../../imagens/groselha.svg';
import Canela from '../../imagens/canela.svg';
import Morango from '../../imagens/morango.svg';
import estrela from '../../imagens/Estrelinhas.svg';
import MorangoECacau from '../../imagens/ChocPistMorLim.png';
import BannerImage1 from '../../imagens/banner1.svg'; // Exemplo de imagem do banner 1
import BannerImage2 from '../../imagens/banner2.svg';  // Exemplo de imagem do banner 2

// Estilização com Styled Components
const TituloCarrossel = styled.h2`
  font-size: 2rem;
  color: #EB9B00;
  font-weight: 700;
  text-align: center;
  margin: 30px 0;
`;

const DescricaoTitulo = styled.h3`
  color: #EB9B00;
  font-size: 1.8rem;
  margin: 10px auto;
`;

const DescricaoTexto = styled.p`
  color: #002F52;
  font-size: 1rem;
  font-weight: 600;
  margin: 10px auto;
  text-align: center;
`;

// Animação de entrada da direita
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Card com a animação de entrada
const CardAnimado = styled(Card.Img)`
  animation: ${slideInRight} 1.5s ease-out;
  height: 250px;
  object-fit: cover;
`;

const ImagemGrande = styled.img`
  height: 700px; /* Aumenta a altura da imagem */
  object-fit: contain; /* Mantém a proporção da imagem */
`;

const CarrosselModerno = () => {
  return (
    <Container fluid className="p-0">
      {/* Carrossel de Banners Interativos */}
      <Carousel fade className="mb-5">
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={BannerImage1}
            alt="Banner 1"
            style={{ height: '500px', width: 'auto', objectFit: 'contain' }} 
          />
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={BannerImage2}
            alt="Banner 2"
            style={{ height: '500px', width: 'auto', objectFit: 'contain' }} 
          />
        </Carousel.Item>
      </Carousel>

      {/* Título da Coleção */}
      <TituloCarrossel>Nossa Coleção!</TituloCarrossel>

      {/* Carrossel de Produtos com Zoom e Destaque */}
      <Carousel className="carousel-dark">
        {[Banana, Cacau, Maca, Amarula, figo, groselha, Canela, Morango].map((imagem, index) => (
          <Carousel.Item key={index} interval={2000}>
            <div className="d-flex justify-content-center">
              <ImagemGrande
                className="d-block"
                src={imagem}
                alt={`Licor ${index}`}
              />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Card de Destaque com Animação de Hover */}
      <Card className="text-center my-5 shadow-lg border-0" style={{ width: '100%', maxWidth: '800px', margin: 'auto', display: 'flex', alignItems: 'center' }}>
  <Card.Body className="p-4">
    <img src={estrela} alt="Avaliação 5 Estrelas" className="mb-3 img-fluid" style={{ width: '80px', maxWidth: '100%' }} />
    <CardAnimado
      variant="left"
      src={MorangoECacau}
      alt="Licor Fino de Chocolate e Morango"
      className="img-fluid"
      style={{ objectFit: 'contain', width: '100%', maxHeight: '250px' }}
    />
    <DescricaoTitulo>A Mais Escolhida!!!</DescricaoTitulo>
    <DescricaoTexto>A bebida favorita entre nossas clientes é o delicioso Licor Fino de Chocolate, Pistache, Morango e Limão.</DescricaoTexto>
    <Button href="/catálogo" variant="warning" size="lg" className="mt-3">
      Explore mais
    </Button>
  </Card.Body>
</Card>


    </Container>
  );
};

export default CarrosselModerno;
