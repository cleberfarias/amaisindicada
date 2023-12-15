import perfil from '../../imagens/perfil.svg'
import sacola from '../../imagens/sacola.svg'
import styled from 'styled-components'
import './IconesHeader.css'
import { Link } from 'react-router-dom'

const Icone = styled.li`
  font-size: 1.5rem;
  display: flex;
  align-items: center; /* Corrigido o typo aqui */
  justify-content: center;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative; /* Corrigido o typo aqui */
  margin-left: 20px;

  img {
    max-width: auto;
    height: auto;
  }
`

const Icones = styled.ul`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`

const Span = styled.span`
  /* Adicione estilos conforme necessário para o seu caso */
`

const icones = [perfil, sacola]

function IconesHeader() {
  return (
    <Icones>
      {icones.map((icone, index) => (
        <Icone key={index}>
          {index === 1 ? <Span className='cart-status'>1</Span> : null}
          {index === 1 ? (
            <Link to="/sacola">
              <img src={icone} alt='Imagem Icone' />
            </Link>
          ) : (
            <img src={icone} alt='Imagem Icone' />
          )}
        </Icone>
      ))}
    </Icones>
  );
}
export default IconesHeader
