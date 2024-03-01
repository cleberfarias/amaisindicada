import React from 'react';

import Prata from '../../imagens/fotos mais indicada/Prata.jpg';
import Ouro from '../../imagens/fotos mais indicada/Ouro.jpg';
import Morango from '../../imagens/fotos mais indicada/Morango.jpg';
import Maracuja from '../../imagens/fotos mais indicada/Maracuja.jpg';
import MacaVerde from '../../imagens/fotos mais indicada/MacaVerde.jpg';
import Canela from '../../imagens/fotos mais indicada/Canela.jpg';
import Groselha from '../../imagens/fotos mais indicada/Groselha.jpg';
import Figo from '../../imagens/fotos mais indicada/Fico.jpg';
import Coco from '../../imagens/fotos mais indicada/Coco.jpg';
import Cacau from '../../imagens/fotos mais indicada/Cacau.jpg';
import Banana from '../../imagens/fotos mais indicada/Banana.jpg';

function Produtos() {
    // Definindo o array de produtos
    const produtos = [
        {
            id: 1,
            nome: 'Cachaça Prata',
            preco: 20.00,
            imagem: Prata,
            descricao: 'Cachaça de qualidade produzida artesanalmente.',
            estoque: 200
        },
        {
            id: 2,
            nome: 'Cachaça Ouro',
            preco: 30.00,
            imagem: Ouro,
            descricao: 'Envelhecida no carvalho, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 3,
            nome: 'Licor de Morango',
            preco: 40.00,
            imagem: Morango,
            descricao: 'Licor cremoso de morango, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 4,
            nome: 'Licor Maracuja',
            preco: 40.00,
            imagem: Maracuja,
            descricao: 'Licor cremoso de maracuja, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 5,
            nome: 'Licor Maçã Verde',
            preco: 40.00,
            imagem: MacaVerde,
            descricao: 'Licor de maçã verde, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 6,
            nome: 'Licor Canela',
            preco: 40.00,
            imagem: Canela,
            descricao: 'Licor de canela, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 7,
            nome: 'Licor Groeselha',
            preco: 40.00,
            imagem: Groselha,
            descricao: 'Licor de groselha, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 8,
            nome: 'Licor Figo',
            preco: 40.00,
            imagem: Figo,
            descricao: 'Licor de Figo, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 9,
            nome: 'Licor Coco',
            preco: 40.00,
            imagem: Coco,
            descricao: 'Licor cremoso de coco, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 10,
            nome: 'Licor Cacau',
            preco: 40.00,
            imagem: Cacau,
            descricao: 'Licor cremoso de cacau, produzida artesanalmente.',
            estoque: 150
        },
        {
            id: 11,
            nome: 'Licor Banana',
            preco: 40.00,
            imagem: Banana,
            descricao: 'Licor cremoso de Banana, produzida artesanalmente.',
            estoque: 150
        },
        
        
        
        // Adicione mais produtos conforme necessário
    ];

    return (
        <>
            <hr className="mt-3" />
            <div className="row g-3">
                {produtos.map(produto => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={produto.id}>
                        <div className="card text-center bg-light">
                            <a href="#" className="position-absolute end-0 p-2 text-danger">
                                <i className="bi-suit-heart" style={{ fontSize: "24px", lineHeight: "24px" }}></i>
                            </a>
                            <a href="/produto.html">
                                <img src={produto.imagem} className="card-img-top" alt="Product" />
                            </a>
                            <div className="card-header">
                                R$ {produto.preco.toFixed(2)}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text truncar-3l">{produto.descricao}</p>
                            </div>
                            <div className="card-footer">
                                <a href="carrinho.html" className="btn btn-danger mt-2 d-block">
                                    Adicionar ao Carrinho
                                </a>
                                <small className="text-success">{produto.estoque} unidades em estoque</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Produtos;
