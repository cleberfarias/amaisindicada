import Logo from '../Logo/Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader/IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px; /* Adjust padding as needed */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow if desired */
    height: 60px; /* Adjust the height as needed */
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