import React, { useState, useEffect } from 'react';

const FechamentoCompra = ({ produtos, frete }) => {
    const [metodoPagamento, setMetodoPagamento] = useState('');
    const [parcelas, setParcelas] = useState(1);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        calcularValorTotal();
    }, [produtos, frete]); // Atualize o useEffect para observar mudanças em produtos e frete

    const handlePagamentoChange = (e) => {
        setMetodoPagamento(e.target.value);
    };

    const handleParcelasChange = (e) => {
        setParcelas(parseInt(e.target.value));
    };

    const calcularValorTotal = () => {
        if (!produtos || produtos.length === 0) {
            setValorTotal(0);
        } else {
            const totalProdutos = produtos.reduce((acc, produto) => {
                return acc + produto.preco * produto.quantidade;
            }, 0);
            const total = totalProdutos + frete; // Somar o frete ao total dos produtos
            setValorTotal(total);
        }
    };

    const handleConfirmarCompra = () => {
        // Lógica para confirmar a compra
        console.log(`Compra confirmada com método de pagamento: ${metodoPagamento} e ${parcelas} parcela(s).`);
    };

    return (
        <div>
            <h1>Fechar Compra</h1>
            <div className="mb-3">
                <label htmlFor="metodoPagamento" className="form-label">Método de Pagamento</label>
                <select
                    className="form-select"
                    id="metodoPagamento"
                    value={metodoPagamento}
                    onChange={handlePagamentoChange}
                >
                    <option value="">Selecione o método de pagamento</option>
                    <option value="cartaoCredito">Cartão de Crédito</option>
                    <option value="pix">PIX</option>
                    <option value="boleto">Boleto</option>
                </select>
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
                    <div className="mt-3">
                        <label htmlFor="parcelas" className="form-label">Parcelas</label>
                        <select className="form-select" id="parcelas" value={parcelas} onChange={handleParcelasChange}>
                            <option value={1}>À vista</option>
                            <option value={2}>2 vezes</option>
                            <option value={3}>3 vezes</option>
                            <option value={4}>4 vezes</option>
                        </select>
                    </div>
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
                <h4 className="text-dark mb-3">Valor Total: R$ {valorTotal.toFixed(2)}</h4>
                <button className="btn btn-danger btn-lg" onClick={handleConfirmarCompra}>Confirmar Compra</button>
            </div>
        </div>
    );
};

export default FechamentoCompra;
