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
  const [produtosAtualizados, setProdutosAtualizados] = useState(produtos);

  const paypalRef = useRef();

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?currency=BRL&client-id=Ad_4dmlreT74ytlqJxqONNIFYq0lP5F1yQY7HI980OI1aY5q9W28IRMu_C9X1A18PDEXau1eqx6UrcLg`;
      script.id = 'paypal-sdk';
      script.addEventListener("load", () => setLoaded(true));
      script.addEventListener("error", () => setError('Erro ao carregar o PayPal SDK.'));
      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded && window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: "Compra no Carrinho",
              amount: {
                currency_code: "BRL",
                value: (calcularValorTotalProdutos() + frete).toFixed(2)
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(() => {
            setPaid(true);
          }).catch(() => {
            setError('Erro ao capturar o pagamento.');
          });
        },
        onError: () => {
          setError('Erro com o botão do PayPal.');
        }
      }).render(paypalRef.current);
    }
  }, [loaded, frete]);

  const handleCepChange = (e) => setCep(e.target.value);

  const calcularFrete = async () => {
    const cepFormatado = cep.replace(/\D/g, '');
    console.log('CEP formatado:', cepFormatado);
    try {
      const response = await axios.post('https://api-sxuitgeywa-uc.a.run.app/calcular-frete', {
        from: { postal_code: '88598000' },
        to: { postal_code: cepFormatado },
        package: {
          height: 4,
          width: 12,
          length: 17,
          weight: 0.3
        }
      });

      console.log('Resposta da API:', response.data);

      const pacFrete = response.data.find(service => service.id === 1);
      
      if (pacFrete && typeof pacFrete.price === 'string') {
        setFrete(parseFloat(pacFrete.price));
      } else {
        setFrete(0);
      }
      setError(null);
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
      setError('Erro ao calcular o frete. Verifique o CEP e tente novamente.');
      setFrete(0);
    }
  };

  const calcularValorTotalProdutos = () => {
    return produtosAtualizados.reduce((total, produto) => {
      const valorProduto = produto.preco || 0;
      const quantidadeProduto = produto.quantidade || 0;
      return total + (valorProduto * quantidadeProduto);
    }, 0);
  };

  const alterarQuantidade = (id, incremento) => {
    const novosProdutos = produtosAtualizados.map(produto => 
      produto.id === id ? { ...produto, quantidade: Math.max(1, produto.quantidade + incremento) } : produto
    );
    setProdutosAtualizados(novosProdutos);
  };

  return (
    <div>
      <HeaderCatalogo />
      <main className="flex-fill">
        <div className="container">
          <h1>Carrinho de Compras</h1>
          {paid ? (
            <div className="alert alert-success" role="alert">Parabéns pela compra!</div>
          ) : (
            <>
              <ul className="list-group mb-3">
                {produtosAtualizados.map(produto => (
                  <li className="list-group-item py-3" key={produto.id}>
                    <div className="row g-3">
                      <div className="col-4 col-md-3 col-lg-2">
                        <img src={produto.imagem} className="img-thumbnail" alt={produto.nome} />
                      </div>
                      <div className="col-8 col-md-9 col-lg-7 col-xl-8 text-left align-self-center">
                        <h4><b>{produto.nome}</b></h4>
                        <h5>{produto.descricao}</h5>
                      </div>
                      <div className="col-6 col-md-4 offset-md-8 col-lg-3 col-xl-2 align-self-center mt-3">
                        <div className="input-group">
                          <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => alterarQuantidade(produto.id, -1)}>
                            <i className="bi bi-caret-down"></i>
                          </button>
                          <input type="text" className="form-control text-center border-dark" value={produto.quantidade} readOnly />
                          <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => alterarQuantidade(produto.id, 1)}>
                            <i className="bi bi-caret-up"></i>
                          </button>
                          <button className="btn btn-outline-danger btn-sm" type="button">
                            <i className="bi bi-trash"></i>
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
              <div className="alert alert-warning">Realize o pagamento para concluir a compra.</div>
            </>
          )}
          <div className="row">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Digite o CEP" value={cep} onChange={handleCepChange} />
                <button className="btn btn-outline-secondary" type="button" onClick={calcularFrete}>Calcular Frete</button>
              </div>
              {frete > 0 && <p className="text-muted">Frete PAC: R$ {frete.toFixed(2)}</p>}
              {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="col-md-6 text-end">
              <FechamentoCompra 
                produtos={produtosAtualizados} 
                frete={frete} 
                calcularValorTotalProdutos={calcularValorTotalProdutos} 
              />
              <div className="text-dark">
                <strong>Valor Total: R$ {(calcularValorTotalProdutos() + frete).toFixed(2)}</strong>
              </div>
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
