import logo from '../../imagens/Logo.png'
import styled from 'styled-components';

const LogoContainer = styled.div`
    margin-right: 10px; 
    width: 500px;
    height: 400px;
`
const LogoImage = styled.img`
    display: flex;
    font-size: 30px;
    margin-right: 30px;
    width: 10;
    height: 10;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='Logo'/>    
        </LogoContainer>
    )
}
export default Logo;