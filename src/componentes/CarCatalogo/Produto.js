import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Produtos() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([
        {
            id: 1,
            nome: 'Prata',
            descricao: 'Cachaça Prata Envelhecida',
            preco: 30.00,
            estoque: 100,
            imagem: require('../../imagens/fotos mais indicada/Prata.jpg')
        },
        {
            id: 2,
            nome: 'Ouro',
            descricao: 'Envelhecida no Carvalho',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Ouro.jpg')
        },
        {
            id: 3,
            nome: 'Licor Banana',
            descricao: 'Licor Fino de Banana',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Banana.jpg')
        },
        {
            id: 4,
            nome: 'Licor Cacau',
            descricao: 'Licor Cremoso de Cacau',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Cacau.jpg')
        },
        {
            id: 5,
            nome: 'Licor Cacau',
            descricao: 'Licor Fino de Canela',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Canela.jpg')
        },
        {
            id: 6,
            nome: 'Licor Coco',
            descricao: 'Licor Cremoso de Coco',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Coco.jpg')
        },
        {
            id: 7,
            nome: 'Licor Figo',
            descricao: 'Licor Fino de Figo',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Fico.jpg')
        },
        {
            id: 8,
            nome: 'Licor Groselha',
            descricao: 'Licor Fino de Groselha',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/groselha (2).png')
        },
        {
            id: 9,
            nome: 'Licor Maçã Verde',
            descricao: 'Licor Fino de Maçã Verde',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Maca.jpg')
        },
        {
            id: 10,
            nome: 'Licor Maracuja',
            descricao: 'Licor Cremoso de Maracuja',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Maracuja.jpg')
        },
        {
            id: 11,
            nome: 'Licor Morango',
            descricao: 'Licor Cremoso de Morango',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Morango.jpg')
        },
        {
            id: 12,
            nome: 'Cachaça',
            descricao: 'Cachaça de Amburana',
            preco: 40.00,
            estoque: 50,
            imagem: require('../../imagens/fotos mais indicada/Amburana.jpg')
        },
        // Adicione mais produtos conforme necessário
    ]);
    const [quantidade, setQuantidade] = useState({});

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
