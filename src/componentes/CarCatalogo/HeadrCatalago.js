import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiCart } from 'react-icons/bi';// Importe o ícone do carrinho

function HeaderCatalogo() {
    return (
        <div style={{background: 'linear-gradient(to right, #663300, #ffffff)'}}>
            <nav className="navbar navbar-expand-lg border-bottom shadow-sm navbar-dark mb-3" style={{background: 'linear-gradient(to right, #ffffff, #663300)'}}>
                <div className="container">
                    <a className="navbar-brand" href="/catálogo"><b>Indica Online</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/index.html">Principal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" href="/contato.html">Contato</a>
                            </li>
                        </ul>
                        <div className="align-self-end">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href="/cadastro.html" className="nav-link text-white">Quero Me Cadastrar</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/login.html" className="nav-link text-white">Entrar</a>
                                </li>
                                <li className="nav-item">
                                    <span className="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="5 produto(s) no carrinho"><small></small></span>
                                    <a href="/carrinho.html" className="nav-link text-white">
                                        <BiCart size={32} /> {/* Use o ícone Cart3 e ajuste o tamanho */}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        
            <main className="flex-fill">
                <div className="container">
                    {/* Conteúdo do catálogo vai aqui */}
                </div>
            </main>
        </div>
    );
}

export default HeaderCatalogo;
