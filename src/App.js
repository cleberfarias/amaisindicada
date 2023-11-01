import './App.css';
import Logo from './componentes/Logo'
import perfil from './imagens/perfil.svg'
import sacola from './imagens/sacola.svg'

const textoOpecoes = ['Sabores', 'Minha Estante', 'Favoritos']
const icones =[ perfil, sacola]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo></Logo>
        <ul className='opcoes'>
          {textoOpecoes.map((texto) => (
          <li className='lista'><p>{texto}</p></li>))}
        </ul>    

        <ul className='icones'>
          {icones.map((icones) =>(
            <li className='icone'>
              <img src={icones}></img>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
