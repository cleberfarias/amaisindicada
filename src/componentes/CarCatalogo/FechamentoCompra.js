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
            
            <div className="text-end">
                <h4 className="text-dark mb-3">Valor Total: R$ {valorTotal.toFixed(2)}</h4>
                
            </div>
        </div>
    );
};

export default FechamentoCompra;
