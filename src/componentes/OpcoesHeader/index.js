import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcoes = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;

`
const Opcao = styled.li`
font-size: 16px;
display: flex;
justify-content: auto;
align-items: auto;
text-align: auto;
height: 100%;
padding: 0 2px;
cursor: pointer;
min-width: 120px;
`

const textoOpecoes = ['Catálogo', 'Institucional', 'Favoritos']

function OpcoesHeader() {
    return (
        <Opcoes>
            {textoOpecoes.map((texto) => (
                <Link to={`/${texto.toLowerCase()}`} ><Opcao><p>{texto}</p></Opcao></Link>
                ))}
        </Opcoes>

    )
}
export default OpcoesHeader; 