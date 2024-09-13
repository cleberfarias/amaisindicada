import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
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
    const [error, setError] = useState(null);

    const paypalRef = useRef();

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
                                value: (produto.preco * produto.quantidade).toFixed(2)
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

    const calcularFrete = async () => {
        if (!cep.match(/^\d{5}-\d{3}$/)) {
            setError('CEP inválido. Use o formato 12345-678.');
            return;
        }

        try {
            const response = await axios.post('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
                from: {
                    postal_code: '88598-000'
                },
                to: {
                    postal_code: cep
                },
                products: produtos.map(produto => ({
                    id: produto.id,
                    width: produto.largura,
                    height: produto.altura,
                    length: produto.comprimento,
                    weight: produto.peso,
                    insurance_value: produto.valorSegurado || 0,
                    quantity: produto.quantidade
                })),
                options: {
                    receipt: false,
                    own_hand: false
                },
                services: "1,2,3,4,7,11"
            }, {
                headers: {
                    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDAxM2ExMzExMDA1ODVhOTI4NTU4OTQwNDQwNjM2N2NjYmJkMzIzM2EyMWM0N2EwNGZkOWYyMWFhNGIzYjg3Yjg2YWYyMTAzNzNlMjgzN2YiLCJpYXQiOjE3MjU5NzIwMDUuNjY2MzA5LCJuYmYiOjE3MjU5NzIwMDUuNjY2MzIyLCJleHAiOjE3NTc1MDgwMDUuNjUzNjk2LCJzdWIiOiI5Y2QzYTllOC1iYzcwLTRhMDctYTMyZS0wMjgyZDVlODM1ZmEiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.zUht0jTSc-zVzzZbJDAyQqmgDj2pBN3_hDV4XDLo2b0qkjfDZWc82dpiNURweX3XRPGA-pFtT6184MKdPMx5fd-uv00BxbiBlH51n-2q43w_XnDHQiU4-0ZNZegAxJfHNdhHn932zNu-yzJaqw40GeCwWqAUMJCu3paHZpRxOoAA8h4nLx5ZAVGUoTgLdpvSbgHBZe586yBLSSwoIh0hI12g6Ml0Z4q_MUCNyOVB-Gm2CGMi4nEq8AFDWdG923Ub8FcWaplYSKBtuewleon7_4Emu5OqagM9vm77qiLOn2TIDNTzllnVAA4PLrtu-lzh3MtGMsBV23jjdsvVsCXwhl1MA37Ifh2VmJwcdZ-jqEARCOHHgGPJ3qPztYIOfk7BB0VAh8J37o4m-q5mSmAQ_hwZXxmszzy9EPgF-U6yqXZUKO0gweiIsfhpoGyMKiZKszvphOkL_6QC6ExW12h6_6h1v_yIkvwRtz1Mc5ppKE7TIkyuizVWyN6_dlHfmDNrTwONFRRARKg23TfIAktC2q68YE1jjxcrUW4HJm8LoMc5dtQ2hsIFFINRhLl_mGYPDlH0v8nnYgD_VcqgAFSGYqVMHzE-U6tIVam96fV8MhbWmc4q0agDdkjrqtBtyT6sPeqbjX1Cd0J4hKYin7Ily3yfNJOGl9colzF6xJF0sJ4`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Aplicação cleber.fdelgado@gmail.com' // Substitua pelo seu email
                }
            });

            const { value } = response.data;
            setFrete(value);
            setError(null);
        } catch (error) {
            console.error('Error calculating freight:', error);
            setError('Erro ao calcular o frete.');
        }
    };

    const calcularValorTotalProdutos = () => {
        return produtos.reduce((total, produto) => total + (produto.preco * produto.quantidade), 0);
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
                            {error && <p className="text-danger">{error}</p>}
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
