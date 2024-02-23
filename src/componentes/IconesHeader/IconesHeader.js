import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import perfil from '../../imagens/perfil.svg';
import sacola from '../../imagens/sacola.svg';

const Icone = styled.li`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  margin: 0 10px; /* Adicionando margem para separar os ícones */

  img {
    max-width: auto;
    height: auto;
  }

  @media screen and (max-width: 768px) {
    margin: 10px 0; /* Ajustando a margem para dispositivos móveis */
  }
`;

const Icones = styled.ul`
  display: flex;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    flex-direction: column; /* Alterando a direção para coluna em telas menores */
    align-items: center;
  }
`;

const CartStatus = styled.span`
  background-color: red;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 50%; /* Alterando para um círculo */
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
    position: relative; /* Removendo a posição absoluta em telas menores */
    margin-top: -10px; /* Ajustando a margem para compensar a mudança na posição */
  }
`;

const icones = [perfil, sacola];

function IconesHeader() {
  return (
    <Icones>
      {icones.map((icone, index) => (
        <Icone key={index}>
          {index === 1 ? <CartStatus>0</CartStatus> : null}
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

export default IconesHeader;
