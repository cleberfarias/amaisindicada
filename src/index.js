import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './rotas/Home';
import Institucional from './rotas/Institucional';
import Sacola from './rotas/sacola';
import FaleConosco from './rotas/FaleConosco';
import Catalogo from './rotas/Catalogo';
import LoginPrincipal from './componentes/LoginCatalogo/LoginPrincipal';
import CadastroSucesso from './componentes/LoginCatalogo/ConfirmacaoCadastro';
import LoginForm from './componentes/LoginCatalogo/Login';
import CadastrarNovaSenha from './componentes/LoginCatalogo/CadastrarNovaSenha';
import CarrinhoDeCompras from './componentes/CarCatalogo/Carrinho';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%; /* Garante que o body ocupe toda a altura da janela */
  }

  #root {
    height: 100%; /* Garante que o elemento root ocupe toda a altura da janela */
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
      margin: 0 10px;
    }
  }
`;

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/Institucional" element={<Institucional />} />
      <Route path="/" element={<Home />} />
      <Route path="/Catálogo" element={<Catalogo />} />
      <Route path="/sacola" element={<Sacola />} />
      <Route path="/contato" element={<FaleConosco />} />
      <Route path="/contato.html" element={<FaleConosco />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/cadastro.html" element={<LoginPrincipal />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/confirmarcadastro.html" element={<CadastroSucesso />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/login.html" element={<LoginForm />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/confirmcadastrosenha.html" element={<CadastrarNovaSenha />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/carrinho.html" element={<CarrinhoDeCompras/>} />
      <Route path="/index.html" element={<Home />} />

     
  
      
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
