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
