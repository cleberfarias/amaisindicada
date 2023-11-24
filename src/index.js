import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './componentes/Header/Header';
import Home from './rotas/Home';
import Favoritos from './rotas/Favoritos';
import Catalogo from './rotas/Catalogo';


const GlobalStyle = createGlobalStyle`
body {
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

li {
  list-style: none;    
}


`;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/favoritos' element={<Favoritos/>}/>
        <Route path='/' element={ <Home/>}/>
        <Route path='/Institucional' element={<p>Estante</p>}/>
        <Route path='/' element={ <Home />}/>
        <Route path='/Catálogo' element={<Catalogo/>}/>
        <Route path='/' element={ <Home />}/>
      </Routes>
    </BrowserRouter>
   
  </React.StrictMode>
);


reportWebVitals();
