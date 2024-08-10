import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Produtos() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [quantidade, setQuantidade] = useState({});

    // Buscar produtos do back-end
    useEffect(() => {
        fetch('http://localhost:5000/api/produto/listar')
            .then(response => response.json())
            .then(data => {
                console.log('Dados recebidos:', data);  // Adicionando log para depuração
                if (Array.isArray(data)) {
                    setProdutos(data);
                } else {
                    console.error('A resposta da API não é um array:', data);
                }
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }, []);

    const handleQuantidadeChange = (produtoId, value) => {
        setQuantidade(prevQuantidade => ({
            ...prevQuantidade,
            [produtoId]: value
        }));
    };

    const adicionarTodosAoCarrinho = () => {
        const produtosSelecionados = produtos
            .filter(produto => (parseInt(quantidade[produto.id]) || 0) > 0)
            .map(produto => ({
                ...produto,
                quantidade: parseInt(quantidade[produto.id])
            }));

        if (produtosSelecionados.length > 0) {
            const novoProdutos = produtos.map(produto => {
                const qtd = parseInt(quantidade[produto.id]) || 0;
                if (qtd > 0 && produto.estoque >= qtd) {
                    return {
                        ...produto,
                        estoque: produto.estoque - qtd
                    };
                }
                return produto;
            });

            setProdutos(novoProdutos);
            navigate('/carrinho', { state: { produtos: produtosSelecionados } });
        } else {
            alert('Nenhum produto selecionado.');
        }
    };

    return (
        <>
            <hr className="mt-3" />
            <div className="row g-3">
                {produtos.map(produto => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={produto.id}>
                        <div className="card text-center bg-light position-relative">
                            <a href="#" className="position-absolute end-0 p-2 text-danger">
                                <i className="bi-suit-heart" style={{ fontSize: "24px", lineHeight: "24px" }}></i>
                            </a>
                            <a href={`/produto/${produto.id}`}>
                                <img 
                                    src={produto.imagem || 'https://via.placeholder.com/150'} 
                                    className="card-img-top" 
                                    alt={produto.nome} 
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'} 
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </a>
                            <div className="card-header">
                                R$ {produto.preco.toFixed(2)}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text truncar-3l">{produto.descricao}</p>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    min="0" 
                                    max={produto.estoque} 
                                    value={quantidade[produto.id] || 0}
                                    onChange={(e) => handleQuantidadeChange(produto.id, e.target.value)}
                                />
                            </div>
                            <div className="card-footer">
                                {/* Outras ações podem ser adicionadas aqui */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center">
                <button className="btn btn-danger mt-3" onClick={adicionarTodosAoCarrinho}>
                    Adicionar Todos ao Carrinho
                </button>
            </div>
        </>
    );
}

export default Produtos;
