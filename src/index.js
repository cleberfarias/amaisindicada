import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './rotas/Home';
import Institucional from './rotas/Institucional';
import FaleConosco from './rotas/FaleConosco';
import Catalogo from './rotas/Catalogo';
import LoginPrincipal from './componentes/LoginCatalogo/LoginPrincipal';
import CadastroSucesso from './componentes/LoginCatalogo/ConfirmacaoCadastro';
import LoginForm from './componentes/LoginCatalogo/Login';
import CadastrarNovaSenha from './componentes/LoginCatalogo/CadastrarNovaSenha';
import CarrinhoDeCompras from './componentes/CarCatalogo/Carrinho';
import FechamentoCompra from './componentes/CarCatalogo/FechamentoCompra';
import DetalhesProduto from './componentes/CarCatalogo/sobre';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    background-color: #ffd38f;
  }

  #root {
    height: 100%;
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

const AgeVerificationModal = ({ onConfirm }) => (
  <div style={{
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center'
  }}>
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Você tem 18 anos ou mais?</h2>
      <button onClick={() => onConfirm(true)} style={{ marginRight: '10px', padding: '10px 20px' }}>Sim</button>
      <button onClick={() => onConfirm(false)} style={{ padding: '10px 20px' }}>Não</button>
    </div>
  </div>
);

const App = () => {
  const [ageVerified, setAgeVerified] = useState(null);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified) {
      setAgeVerified(true);
    }
  }, []);

  const handleAgeVerification = (isVerified) => {
    if (isVerified) {
      localStorage.setItem('ageVerified', 'true');
      setAgeVerified(true);
    } else {
      alert('Você deve ter 18 anos ou mais para acessar este site.');
      window.location.href = 'https://www.google.com';
    }
  };

  if (!ageVerified) {
    return <AgeVerificationModal onConfirm={handleAgeVerification} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/institucional" element={<Institucional />} />
        <Route path="/" element={<Home />} />
        <Route path="/catálogo" element={<Catalogo />} />
        <Route path="/produto/:id" element={<DetalhesProduto />} />
        <Route path="/contato" element={<FaleConosco />} />
        <Route path="/cadastro" element={<LoginPrincipal />} />
        <Route path="/confirmarcadastro" element={<CadastroSucesso />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/confirmcadastrosenha" element={<CadastrarNovaSenha />} />
        <Route path="/carrinho" element={<CarrinhoDeCompras />} />
        <Route path="/fechamentocompra" element={<FechamentoCompra />} />
      </Routes>
    </BrowserRouter>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);

if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  window.location.href = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registrado com sucesso:', registration);
    })
    .catch((error) => {
      console.error('Erro ao registrar o Service Worker:', error);
    });
}

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

reportWebVitals();
