import React, { useState } from 'react';
import { sabores } from './imagens';
import { useParams, Link } from 'react-router-dom'; // Importando Link
import Header from './HeadrCatalago';
import Footer from './FooterCatalogo';

function DetalhesProduto() {
    const { id } = useParams();
    const produtos =[
        {
    id: 1,
    nome: 'Prata',
    descricao: `Cachaça Indicada Prata - 750ml
    A Cachaça Indicada Prata é uma cachaça artesanal premium, 
    produzida em Celso Ramos, destacada pela sua pureza e leveza. 
    Com um teor alcoólico de 40% vol, esta cachaça é destilada e 
    envelhecida para proporcionar uma experiência suave e refinada 
    ao paladar. Embalada em uma elegante garrafa de 750ml, é perfeita 
    para quem busca um sabor tradicional, com um toque de modernidade.
    Ideal para ser apreciada pura ou em coquetéis, a Indicada Prata traz 
    consigo a autenticidade e o sabor de uma cachaça brasileira de alta 
    qualidade, fazendo jus ao seu nome: a escolha "mais indicada" para os 
    amantes de uma boa cachaça.`,
    preco: 30.00,
    estoque: 100,
    imagem: sabores.Prata,
},
{
    id: 2,
    nome: 'Ouro',
    descricao: 'Envelhecida no Carvalho',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Ouro
},
{
    id: 12,
    nome: 'Amburana',
    descricao: 'Cachaça de Amburana',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Amburana
},
{
    id: 19,
    nome: 'Licor Fino de Café',
    descricao: 'Licor Fino de Café',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Cafe
},
{
    id: 16,
    nome: 'Licor Fino de Canela',
    descricao: 'Licor Fino de Canela',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Canela
},
{
    id: 7,
    nome: 'Licor Fino de Figo',
    descricao: 'Licor Fino de Figo',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Figo
},
{
    id: 8,
    nome: 'Licor Fino de Groselha',
    descricao: 'Licor Fino de Groselha',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Groselha
},
{
    id: 9,
    nome: 'Licor Fino de Maçã Verde',
    descricao: 'Licor Fino de Maçã Verde',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.MacaVerde
},
{
    id: 3,
    nome: 'Licor Banana',
    descricao: 'Licor Fino de Banana',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Banana
},
{
    id: 18,
    nome: 'Licor Fino de Menta',
    descricao: 'Licor Fino de Menta',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Menta
},
{
    id: 15,
    nome: 'Licor Fino de Açúcar Mascavo',
    descricao: 'Licor Fino de Açúcar Mascavo',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.AcucarMascavo
},
{
    id: 4,
    nome: 'Licor Cacau',
    descricao: 'Licor Cremoso de Cacau',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Cacau
},
{
    id: 6,
    nome: 'Licor Coco',
    descricao: 'Licor Cremoso de Coco',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Coco
},
{
    id: 10,
    nome: 'Licor Maracujá',
    descricao: 'Licor Cremoso de Maracujá',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Maracuja
},
{
    id: 11,
    nome: 'Licor Morango',
    descricao: 'Licor Cremoso de Morango',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Morango
},
{
    id: 5,
    nome: 'Licor Cremoso Abacaxi',
    descricao: 'Licor Cremoso de Abacaxi',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Abacaxi
},
{
    id: 13,
    nome: 'Licor Cremoso de Paçoca',
    descricao: 'Licor Cremoso de Paçoca',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Pacoca
},
{
    id: 14,
    nome: 'Licor Cremoso de Pistache',
    descricao: 'Licor Cremoso de Pistache',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Pistache
},
{
    id: 17,
    nome: 'Licor Cremoso Doce de Leite',
    descricao: 'Licor Cremoso Doce de Leite',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.DoceDeLeite
},
{
    id: 20,
    nome: 'Licor Cremoso de Limão',
    descricao: 'Licor Cremoso de Limão',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.Limao
},
{
    id: 18,
    nome: 'Licor Cremoso de Chocolate Branco',
    descricao: 'Licor Cremoso de Chocolate Branco',
    preco: 40.00,
    estoque: 50,
    imagem: sabores.ChoclateBranco
},
];

  const produto = produtos.find((produto) => produto.id === parseInt(id));
    const [quantidade, setQuantidade] = useState(1);

    const aumentarQuantidade = () => {
        if (quantidade < produto.estoque) {
            setQuantidade(quantidade + 1);
        }
    };

    const diminuirQuantidade = () => {
        if (quantidade > 1) {
            setQuantidade(quantidade - 1);
        }
    };

    if (!produto) {
        return <h2>Produto não encontrado!</h2>;
    }

    return (
          <>
        <Header />
        <div style={{ display: 'flex', padding: '20px', maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffebcf' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <img src={produto.imagem} alt={produto.nome} style={{ width: '300px', height: 'auto', borderRadius: '8px' }} />
            </div>
            <div style={{ flex: 2, paddingLeft: '20px' }}>
                <h1>{produto.nome}</h1>
                <p>{produto.descricao}</p>
           </div>
           </div>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <Link to="/catálogo">
                    <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#A62A2A', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Voltar para os Produtos
                    </button>
                </Link>
            </div>
            
            
            
            </>
    );
}

export default DetalhesProduto;