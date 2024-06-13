import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCatalogo from '../Header/Header';
import FooterCatalogo from '../Footer/Footer';
import FechamentoCompra from './FechamentoCompra';

function Carrinho() {
    const location = useLocation();
    const { produtos } = location.state || { produtos: [] };

    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(0);

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    const calcularFrete = () => {
        // Simular cálculo do frete com base no CEP
        // Aqui poderia ser feita uma chamada a uma API de cálculo de frete
        setFrete(10.00); // Exemplo: frete fixo de R$ 10.00
    };

    const calcularValorTotalProdutos = () => {
        return produtos.reduce((total, produto) => {
            return total + (produto.preco * produto.quantidade);
        }, 0);
    };

    return (
        <div>
            <HeaderCatalogo />
            <main className="flex-fill">
                <div className="container">
                    <h1>Carrinho de Compras</h1>
                    <ul className="list-group mb-3">
                        {produtos.map(produto => (
                            <li className="list-group-item py-3" key={produto.id}>
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
                                            <input type="text" className="form-control text-center border-dark" value={produto.quantidade} readOnly />
                                            <button className="btn btn-outline-dark btn-sm" type="button">
                                                <i className="bi bi-caret-up" style={{ fontSize: '16px', lineHeight: '16px' }}></i>
                                            </button>
                                            <button className="btn btn-outline-danger border-dark btn-sm" type="button">
                                                <i className="bi bi-trash" style={{ fontSize: '16px', lineHeight: '16px' }}></i>
                                            </button>
                                        </div>
                                        <div className="text-end mt-2">
                                            <small className="text-secondary">Valor: R$ {produto.preco.toFixed(2)}</small><br />
                                            <span className="text-dark">Valor Item: R$ {(produto.preco * produto.quantidade).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Digite o CEP"
                                    value={cep}
                                    onChange={handleCepChange}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={calcularFrete}>
                                    Calcular Frete
                                </button>
                            </div>
                            {frete > 0 && (
                                <p className="text-muted">Frete: R$ {frete.toFixed(2)}</p>
                            )}
                        </div>
                        <div className="col-md-6 text-end">
                            <FechamentoCompra produtos={produtos} frete={frete} calcularValorTotalProdutos={calcularValorTotalProdutos} />
                        </div>
                    </div>
                </div>
            </main>
            <FooterCatalogo />
        </div>
    );
}

export default Carrinho;
