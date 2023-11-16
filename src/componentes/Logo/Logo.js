import logo from '../../imagens/Logo.png'
import styled from 'styled-components';

const LogoContainer = styled.div`
    margin-right: auto; 
    display: flex;
    align-items: center;
    padding-right: 20px;
    
`
const LogoImage = styled.img`
    width: 250px; 
    height: auto;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='Logo'/>    
        </LogoContainer>
    )
}
export default Logo;