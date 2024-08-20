import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderCatalogo from '../Header/Header';
import FooterCatalogo from '../Footer/Footer';
import FechamentoCompra from './FechamentoCompra';

function Carrinho() {
    const location = useLocation();
    const { produtos } = location.state || { produtos: [] };

    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(0);
    const [paid, setPaid] = useState(false); 
    const [loaded, setLoaded] = useState(false); 

    let paypalRef = useRef();

    useEffect(() => {
        if (!document.getElementById('paypal-sdk')) {
            const script = document.createElement("script");
            const id = "Ad_4dmlreT74ytlqJxqONNIFYq0lP5F1yQY7HI980OI1aY5q9W28IRMu_C9X1A18PDEXau1eqx6UrcLg";
            script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=${id}`;
            script.id = 'paypal-sdk';
            script.addEventListener("load", () => setLoaded(true));
            document.body.appendChild(script);
        } else {
            setLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (loaded) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: produtos.map(produto => ({
                            description: produto.descricao,
                            amount: {
                                currency_code: "BRL",
                                value: produto.preco * produto.quantidade
                            }
                        }))
                    });
                },
                onApprove: async (data, actions) => {
                    try {
                        const order = await actions.order.capture();
                        setPaid(true); 
                        console.log(order); 
                    } catch (error) {
                        console.error('Error capturing order:', error);
                    }
                }
            }).render(paypalRef.current); 
        }
    }, [loaded, produtos]);

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    const calcularFrete = () => {
        setFrete(10.00); 
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
                    {paid ? (
                        <div className="alert alert-success" role="alert">
                            Parabéns pela compra!
                        </div>
                    ) : (
                        <>
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
                            <div className="alert alert-warning" role="alert">
                                Realize o pagamento para concluir a compra.
                            </div>
                        </>
                    )}
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
                            {!paid && <div ref={paypalRef}></div>}
                        </div>
                    </div>
                    
                </div>
            </main>
            <FooterCatalogo />
        </div>
    );
}

export default Carrinho;
