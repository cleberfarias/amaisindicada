import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sabores } from "./imagens";



function Produtos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Prata",
      descricao: "Cachaça Prata Envelhecida",
      preco: 30.0,
      estoque: 100,
      imagem: sabores.Prata,
    },
    {
      id: 2,
      nome: "Ouro",
      descricao: "Envelhecida no Carvalho",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Ouro,
    },
    {
      id: 12,
      nome: "Amburana",
      descricao: "Cachaça de Amburana",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Amburana,
    },
    {
      id: 19,
      nome: "Licor Fino de Café",
      descricao: "Licor Fino de Café",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Cafe,
    },
    {
      id: 16,
      nome: "Licor Fino de Canela",
      descricao: "Licor Fino de Canela",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Canela,
    },
    {
      id: 7,
      nome: "Licor Fino de Figo",
      descricao: "Licor Fino de Figo",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Figo,
    },
    {
      id: 8,
      nome: "Licor Fino de Groselha",
      descricao: "Licor Fino de Groselha",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Groselha,
    },
    {
      id: 9,
      nome: "Licor Fino de Maçã Verde",
      descricao: "Licor Fino de Maçã Verde",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.MacaVerde,
    },
    {
      id: 3,
      nome: "Licor Fino Banana",
      descricao: "Licor Fino de Banana",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Banana,
    },
    {
      id: 18,
      nome: "Licor Fino de Menta",
      descricao: "Licor Fino de Menta",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.Menta,
    },
    {
      id: 15,
      nome: "Licor Fino de Açúcar Mascavo",
      descricao: "Licor Fino de Açúcar Mascavo",
      preco: 35.0,
      estoque: 50,
      imagem: sabores.AcucarMascavo,
    },
    {
      id: 4,
      nome: "Licor Cacau",
      descricao: "Licor Cremoso de Cacau",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Cacau,
    },
    {
      id: 6,
      nome: "Licor Coco",
      descricao: "Licor Cremoso de Coco",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Coco,
    },
    {
      id: 10,
      nome: "Licor Maracujá",
      descricao: "Licor Cremoso de Maracujá",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Maracuja,
    },
    {
      id: 11,
      nome: "Licor Morango",
      descricao: "Licor Cremoso de Morango",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Morango,
    },
    {
      id: 5,
      nome: "Licor Abacaxi",
      descricao: "Licor Cremoso de Abacaxi",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Abacaxi,
    },
    {
      id: 13,
      nome: "Licor Paçoca",
      descricao: "Licor Cremoso de Paçoca",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Pacoca,
    },
    {
      id: 14,
      nome: "Licor Pistache",
      descricao: "Licor Cremoso de Pistache",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Pistache,
    },
    {
      id: 17,
      nome: "Licor Doce de Leite",
      descricao: "Licor Cremoso Doce de Leite",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.DoceDeLeite,
    },
    {
      id: 20,
      nome: "Licor Limão",
      descricao: "Licor Cremoso de Limão",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Limao,
    },
    {
      id: 22,
      nome: "Licor Chocolate Branco",
      descricao: "Licor Cremoso de Chocolate Branco",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.ChoclateBranco,
    },
    {
      id: 23,
      nome: "Jambu",
      descricao: "Cachaça Jambu",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Jambu,
    },
    {
      id: 24,
      nome: "Carvalor Ouro",
      descricao: "Carvalor Ouro 1 ano",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Ouro1ano,
    },
    {
      id: 25,
      nome: "Carvalor Ouro 2 anos",
      descricao: "Carvalor Ouro 2 ano",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Ouro2anos,
    },
    {
      id: 26,
      nome: "Licor Uva",
      descricao: "Licor Cremoso de Uva",
      preco: 40.0,
      estoque: 50,
      imagem: sabores.Uva,
    },
    

   

    // Adicione mais produtos conforme necessário
  ]);
  const handleNavigate = (id) => {
    navigate(`/produto/${id}`);
  };
  const [quantidade, setQuantidade] = useState({});

  const handleQuantidadeChange = (produtoId, value) => {
    setQuantidade((prevQuantidade) => ({
      ...prevQuantidade,
      [produtoId]: value,
    }));
  };

  const adicionarTodosAoCarrinho = () => {
    const produtosSelecionados = produtos
      .filter((produto) => (parseInt(quantidade[produto.id]) || 0) > 0)
      .map((produto) => ({
        ...produto,
        quantidade: parseInt(quantidade[produto.id]),
      }));

    if (produtosSelecionados.length > 0) {
      const novoProdutos = produtos.map((produto) => {
        const qtd = parseInt(quantidade[produto.id]) || 0;
        if (qtd > 0 && produto.estoque >= qtd) {
          return {
            ...produto,
            estoque: produto.estoque - qtd,
          };
        }
        return produto;
      });

      setProdutos(novoProdutos);
      navigate("/carrinho", { state: { produtos: produtosSelecionados } });
    } else {
      alert("Nenhum produto selecionado.");
    }
  };

  return (
    <>
      <hr className="mt-3" />
      <div className="row g-2">
        {produtos.map((produto) => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={produto.id}>
            <div className="card text-center bg-light position-relative">
              <a href="#" className="position-absolute end-0 p-2 text-danger">
                <i
                  className="bi-suit-heart"
                  style={{ fontSize: "12px", lineHeight: "12px" }}
                ></i>
              </a>
              <a
                onClick={() => handleNavigate(produto.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={produto.imagem || "https://via.placeholder.com/100"}
                  className="card-img-top"
                  alt={produto.nome}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/100")
                  }
                  style={{ maxWidth: "60%", height: "60%" }}
                />
              </a>
              <div className="card-header">R$ {produto.preco.toFixed(2)}</div>
              <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "0.9rem" }}>
                {produto.nome}
              </h5>
              <p className="card-text truncar-3l" style={{ fontSize: "0.75rem" }}>
                {produto.descricao}
              </p>
              <input
                type="number"
                className="form-control form-control-sm" // Campo menor
                min="0"
                max={produto.estoque}
                value={quantidade[produto.id] || 0}
                onChange={(e) =>
                  handleQuantidadeChange(produto.id, e.target.value)
                }
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
      <button
        className="btn btn-danger btn-sm mt-3" // Botão menor
        onClick={adicionarTodosAoCarrinho}
      >
        Adicionar Todos ao Carrinho
      </button>
    </div>
  </>
);
}

export default Produtos;
