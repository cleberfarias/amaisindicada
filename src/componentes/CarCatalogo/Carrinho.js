import React from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCatalogo from '../Header/Header';
import FooterCatalogo from '../Footer/Footer';

function Carrinho() {
    const location = useLocation();
    const { produto } = location.state || {};

    return (
        <div>
            <HeaderCatalogo />
            <main className="flex-fill">
                <div className="container">
                    <h1>Carrinho de Compras</h1>
                    <ul className="list-group mb-3">
                        {produto && (
                            <li className="list-group-item py-3">
                                <div className="row g-3">
                                    <div className="col-4 col-md-3 col-lg-2">
                                        <a href="#">
                                            <img src={produto.imagem} className="img-thumbnail" alt={produto.nome} />
                                        </a>
                                    </div>
                                    <div className="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                                        <h4>
                                            <b><a href="#" className="text-decoration-none text-danger">{produto.nome}</a></b>
                                        </h4>
                                        <h5>{produto.descricao}</h5>
                                    </div>
                                    <div className="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 col-lg-3 offset-lg-0 col-xl-2 align-self-center mt-3">
                                        <div className="input-group">
                                            <button className="btn btn-outline-dark btn-sm" type="button">
                                                <i className="bi bi-caret-down" style={{ fontSize: '16px', lineHeight: '16px' }}></i>
                                            </button>
                                            <input type="text" className="form-control text-center border-dark" value="1" readOnly />
                                            <button className="btn btn-outline-dark btn-sm" type="button">
                                                <i className="bi bi-caret-up" style={{ fontSize: '16px', lineHeight: '16px' }}></i>
                                            </button>
                                            <button className="btn btn-outline-danger border-dark btn-sm" type="button">
                                                <i className="bi bi-trash" style={{ fontSize: '16px', lineHeight: '16px' }}></i>
                                            </button>
                                        </div>
                                        <div className="text-end mt-2">
                                            <small className="text-secondary">Valor: R$ {produto.preco.toFixed(2)}</small><br />
                                            <span className="text-dark">Valor Item: R$ {produto.preco.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="text-end">
                        <h4 className="text-dark mb-3">Valor Total: R$ {produto ? produto.preco.toFixed(2) : '0.00'}</h4>
                        <a href="/catálogo" className="btn btn-outline-success btn-lg">Continuar Comprando</a>
                        <a href="/FechamentoCompra" className="btn btn-danger btn-lg ms-2 mt-xs-3">Fechar Compra</a>
                    </div>
                </div>
            </main>
            <FooterCatalogo />
        </div>
    );
}

export default Carrinho;
