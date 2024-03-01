import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Opcoes = styled.ul`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100px;
  width: 100%; /* Define a largura como 100% para preencher toda a largura da página */
`;

const Opcao = styled.li`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  padding: 10px;  /* Espaçamento uniforme */
  cursor: pointer;
  min-width: 120px;
  margin-left: 0.6em;
  
 
`;

const TextoOpcao = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 400;
  text-decoration: none; /* Removendo a decoração do texto */
  color: #22778b; /* Definindo a cor verde para o texto */
  transition: color 0.3s ease; /* Adiciona uma transição suave para a mudança de cor */
  
  &:hover {
    color: #ffd700; /* Altera a cor para amarelo quando o mouse estiver sobre o link */
  }
`;

const LinkSemDecoracao = styled(Link)`
  text-decoration: none;
`;

const textoOpcoes = ['Institucional', 'Contato', 'Catálogo'];

function OpcoesHeader() {
  return (
    <Opcoes>
      {textoOpcoes.map((texto) => (
        <LinkSemDecoracao to={`/${texto.toLowerCase()}`} key={texto}>
          <Opcao>
            <TextoOpcao>{texto}</TextoOpcao>
          </Opcao>
        </LinkSemDecoracao>
      ))}
    </Opcoes>
  );
}

export default OpcoesHeader;
