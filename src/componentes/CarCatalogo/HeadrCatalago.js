import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiCart } from 'react-icons/bi'; // Importe o ícone do carrinho

function HeaderCatalogo() {
    return (
        <div style={{ background: '#ffffff' }}>
            <nav className="navbar navbar-expand-lg border-bottom shadow-sm navbar-light mb-3" style={{ background: '#ffffff' }}>
                <div className="container">
                    <a className="navbar-brand" href="/catálogo"><b>Loja Indicada</b></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <a className="nav-link" href="/" style={{ color: '#30261d', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ffd38f'} onMouseOut={(e) => e.target.style.color = '#30261d'}>Principal</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/contato" style={{ color: '#30261d', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ffd38f'} onMouseOut={(e) => e.target.style.color = '#30261d'}>Contato</a>
                            </li>
                        </ul>
                        <div className="align-self-end">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a href="/cadastro" className="nav-link" style={{ color: '#30261d', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ffd38f'} onMouseOut={(e) => e.target.style.color = '#30261d'}>Quero Me Cadastrar</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" style={{ color: '#30261d', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ffd38f'} onMouseOut={(e) => e.target.style.color = '#30261d'}>Entrar</a>
                                </li>
                                <li className="nav-item">
                                    <span className="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0" title="5 produto(s) no carrinho"><small></small></span>
                                    <a href="/carrinho" className="nav-link" style={{ color: '#30261d', transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#ffd38f'} onMouseOut={(e) => e.target.style.color = '#30261d'}>
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
