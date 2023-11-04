import logo from '../../imagens/Logo.png'
import styled from 'styled-components';

const LogoContainer = styled.div`
    margin-right: auto; 
    width: 500px;
    height: 400px;
`
const LogoImage = styled.img`
    display: auto;
    font-size: 30px;
    margin-right: 30px;
    width: 100%;
    height: 75%;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='Logo'/>    
        </LogoContainer>
    )
}
export default Logo;