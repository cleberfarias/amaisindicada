import Logo from '../Logo/Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader/IconesHeader';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    background-color: linear-gradient(90deg, #002F52 50%, #326589);
    display: flex;
    justify-content: center;
`

function Header() {
    return (
            <HeaderContainer>
            <Logo />
            <OpcoesHeader />
            <IconesHeader />
        </HeaderContainer>

    )
}
export default Header;
