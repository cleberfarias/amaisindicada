import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcoes = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Opcao = styled.li`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 10px;  /* Espaçamento uniforme */
  cursor: pointer;
  min-width: 120px;

  @media screen and (max-width: 768px) {
    padding: 8px;  /* Ajuste para telas menores */
    font-size: 14px;  /* Redução de tamanho de fonte para telas menores */
  }
`;

const TextoOpcao = styled.p`
  margin: 0;
`;

const textoOpcoes = ['Catálogo', 'Institucional', 'Favoritos'];

function OpcoesHeader() {
  return (
    <Opcoes>
      {textoOpcoes.map((texto) => (
        <Link to={`/${texto.toLowerCase()}`} key={texto}>
          <Opcao>
            <TextoOpcao>{texto}</TextoOpcao>
          </Opcao>
        </Link>
      ))}
    </Opcoes>
  );
}

export default OpcoesHeader;
