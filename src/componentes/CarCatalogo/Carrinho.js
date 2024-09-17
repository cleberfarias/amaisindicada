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

  // Load PayPal SDK
  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=Ad_4dmlreT74ytlqJxqONNIFYq0lP5F1yQY7HI980OI1aY5q9W28IRMu_C9X1A18PDEXau1eqx6UrcLg`;
      script.id = 'paypal-sdk';
      script.addEventListener("load", () => setLoaded(true));
      script.addEventListener("error", (error) => {
        console.error('Error loading PayPal SDK:', error);
        setError('Erro ao carregar o PayPal SDK.');
      });
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          // Create an order object with purchase units
          return actions.order.create({
            purchase_units: produtos.map(product => ({
              description: product.nome,
              amount: {
                currency_code: "BRL",
                value: (product.preco * product.quantidade).toFixed(2)
              }
            }))
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((orderData) => {
            console.log('Capture success', orderData);
            setPaid(true);
          }).catch((err) => {
            console.error('Error capturing order:', err);
            setError('Erro ao capturar o pagamento.');
          });
        },
        onError: (err) => {
          console.error('PayPal button error:', err);
          setError('Erro com o botão do PayPal.');
        }
      }).render(paypalRef.current);
    }
  }, [loaded, produtos]);

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  // Calculate shipping cost based on postal code
  const calcularFrete = async () => {
    const cepFormatado = cep.replace(/\D/g, ''); // Formatar o CEP

    try {
        const pacote = {
            weight: 0.775, // Peso em kg
            dimensions: {
                height: 30,    // Altura em cm
                width: 30,     // Largura em cm
                length: 8.6    // Comprimento (profundidade) em cm
            }
        };

        // Enviar requisição para o back-end
        const response = await axios.post('http://localhost:8080/calcular-frete', {
            from: { postal_code: '88598-000' }, // Código de origem fixo
            to: { postal_code: cepFormatado },
            package: pacote
        });

        const { valorFrete } = response.data;
        setFrete(valorFrete); // Atualiza o estado com o valor do frete
        setError(null); // Limpa o erro se tudo der certo

    } catch (error) {
        console.error('Erro ao calcular o frete:', error);
        setError('Erro ao calcular o frete. Verifique o CEP e tente novamente.');
    }
};

  // Calculate total value of products (if needed for `FechamentoCompra`)
  const calcularValorTotalProdutos = () => {
    return produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
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
