import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner1 from "../../imagens/banner 1.jpg";
import Banner2 from "../../imagens/Banner 2.jpg";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Banner() {
    return (
        <div className="container">
            <div id="carouselMain" className="carousel slide carousel-dark" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carouselMain" data-bs-slide-to="2"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img src={Banner1} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Banner2} className="d-block w-100" alt="" />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img src={Banner1} className="d-block w-100" alt="" />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselMain" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselMain" data-bs-slide="next">
                    <span className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Próximo</span>
                </button>
            </div>
            <hr className="mt-3" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
        </div>
    );
}

export default Banner;
