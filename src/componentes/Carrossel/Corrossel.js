import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Carrossel.css';
import Banana from '../../imagens/banana.svg';
import Cacau from '../../imagens/cacau.svg';
import Maca from '../../imagens/Maça.svg';
import Amarula from '../../imagens/amarula.svg';
import figo from '../../imagens/figo.svg';
import groselha from '../../imagens/groselha.svg';
import Canela from '../../imagens/Canela.svg';
import Morango from '../../imagens/morango.svg';
import estrela  from'../../imagens/Estrelinhas.svg';
import MorangoECacau from'../../imagens/MorangoCacau.svg';
import Favorito from '../../imagens/Favoritos-1.svg';
import Sacola from '../../imagens/sacola.svg';


function Carrossel() {
  return (
    <section className="carrossel">
      <h2 className="carrossel__titulo">Ultimos Lançamento</h2>

      <div className="carrossel__container">
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
        <div className="card">
                    
          <div className="card__descrição">
                        
            <div className="descrição">
              <img src={estrela} alt="Avaliação 5 Estrelas"/>
              <h3 className="descrição__titulo">A Mais escolhida</h3>
              <h2 className="descrição__titulo-livro">Licor Fino de chocolate e Morango</h2>
              <p className="descrição__texto">A Bebida mais escolhida pelas as mulheres...</p>
            </div>
            <img src={MorangoECacau} className="dercrição__imagem"/>
          </div>

                    
          <div className="card__botões">
            <ul className="botões">
              <li className="botões__item"><img src={Favorito} alt="Favoritar livro"/></li>
              <li className="botões__item"><img src={Sacola} alt="Adicionar no carrinho"/></li>

            </ul>
                        
            <a href="#" className="botões__ancora">Saiba mais</a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Carrossel;