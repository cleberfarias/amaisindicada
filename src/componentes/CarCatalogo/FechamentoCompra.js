import React, { useState } from 'react';
import HeaderCatalogo from '../Header/Header';
import FooterCatalogo from '../Footer/Footer';

const FechamentoCompra = () => {
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [cep, setCep] = useState('');
    const [frete, setFrete] = useState(null);

    const calcularFrete = () => {
        // Aqui você pode adicionar a lógica para calcular o frete baseado no CEP
        // Por enquanto, vamos usar um valor fixo para o exemplo
        setFrete(20.0);
    };

    const handlePagamentoChange = (e) => {
        setMetodoPagamento(e.target.value);
    };

    const handleCepChange = (e) => {
        setCep(e.target.value);
    };

    return (
        <div>
            <HeaderCatalogo />
            <main className="flex-fill">
                <div className="container">
                    <h1>Fechar Compra</h1>
                    <div className="mb-3">
                        <label htmlFor="cep" className="form-label">CEP para cálculo do frete</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cep"
                            value={cep}
                            onChange={handleCepChange}
                            placeholder="Digite seu CEP"
                        />
                        <button className="btn btn-primary mt-2" onClick={calcularFrete}>Calcular Frete</button>
                    </div>
                    {frete !== null && (
                        <div className="mb-3">
                            <h5>Valor do Frete: R$ {frete.toFixed(2)}</h5>
                        </div>
                    )}
                    <div className="mb-3">
                        <label className="form-label">Método de Pagamento</label>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="pagamento"
                                id="cartaoCredito"
                                value="cartaoCredito"
                                onChange={handlePagamentoChange}
                            />
                            <label className="form-check-label" htmlFor="cartaoCredito">
                                Cartão de Crédito
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="pagamento"
                                id="pix"
                                value="pix"
                                onChange={handlePagamentoChange}
                            />
                            <label className="form-check-label" htmlFor="pix">
                                PIX
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="pagamento"
                                id="boleto"
                                value="boleto"
                                onChange={handlePagamentoChange}
                            />
                            <label className="form-check-label" htmlFor="boleto">
                                Boleto
                            </label>
                        </div>
                    </div>
                    {metodoPagamento === 'cartaoCredito' && (
                        <div className="mb-3">
                            <label htmlFor="numeroCartao" className="form-label">Número do Cartão</label>
                            <input type="text" className="form-control" id="numeroCartao" placeholder="Número do Cartão" />
                            <label htmlFor="nomeCartao" className="form-label mt-2">Nome no Cartão</label>
                            <input type="text" className="form-control" id="nomeCartao" placeholder="Nome no Cartão" />
                            <label htmlFor="validadeCartao" className="form-label mt-2">Validade</label>
                            <input type="text" className="form-control" id="validadeCartao" placeholder="MM/AA" />
                            <label htmlFor="cvvCartao" className="form-label mt-2">CVV</label>
                            <input type="text" className="form-control" id="cvvCartao" placeholder="CVV" />
                        </div>
                    )}
                    {metodoPagamento === 'pix' && (
                        <div className="mb-3">
                            <p>Use o QR Code abaixo para pagar com PIX:</p>
                            {/* Aqui você pode adicionar o QR Code para pagamento com PIX */}
                            <img src="qr-code-placeholder.png" alt="QR Code PIX" className="img-fluid" />
                        </div>
                    )}
                    {metodoPagamento === 'boleto' && (
                        <div className="mb-3">
                            <p>O boleto será gerado após a confirmação do pedido.</p>
                        </div>
                    )}
                    <div className="text-end">
                        <button className="btn btn-danger btn-lg">Confirmar Compra</button>
                    </div>
                </div>
            </main>
            <FooterCatalogo />
        </div>
    );
};

export default FechamentoCompra;
