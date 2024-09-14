import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../imagens/Logo.png'

// Estilo do HeaderContainer usando styled-components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  height: 100px;
  width: 100%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

// Estilo para o componente de opções do menu
const Opcoes = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100px;
  width: 100%;
  list-style: none;
  padding: 0;
`;

const Opcao = styled.li`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 10px;
  cursor: pointer;
  min-width: 120px;
  margin-left: 0.6em;
`;

const TextoOpcao = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
  color: #30261d;
  transition: color 0.3s ease;
  &:hover {
    color: #ffd700;
  }
`;

const LinkSemDecoracao = styled(Link)`
  text-decoration: none;
`;

// Função Header usando Bootstrap
function Header() {
  const textoOpcoes = ['Institucional', 'Contato', 'Catálogo'];

  return (
    <HeaderContainer className="container-fluid">
      {/* Logo */}
      <Link to="/" className="navbar-brand">
      <img src={Logo} alt="Logo" style={{ height: '130px', width: 'auto' }} />
      </Link>

      {/* Opções do menu */}
      <nav className="navbar navbar-expand-md navbar-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <Opcoes className="navbar-nav ml-auto">
            {textoOpcoes.map((texto) => (
              <LinkSemDecoracao to={`/${texto.toLowerCase()}`} key={texto}>
                <Opcao className="nav-item">
                  <TextoOpcao className="nav-link">{texto}</TextoOpcao>
                </Opcao>
              </LinkSemDecoracao>
            ))}
          </Opcoes>
        </div>
      </nav>
    </HeaderContainer>
  );
}

export default Header;
