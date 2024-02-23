import Logo from '../Logo/Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader/IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #ffffff, #663300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  height: 80px;
  width: 100%; /* Define a largura como 100% para preencher toda a largura da página */

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;
function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      <OpcoesHeader />
      <IconesHeader />
    </HeaderContainer>
  );
}

export default Header;
