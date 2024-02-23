import logo from '../../imagens/Logo.png';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* Adicionando alinhamento no eixo principal */
    padding: 10px; /* Adicionei padding para espaçamento */
    max-width: 180px; /* Definindo largura máxima para evitar distorções */
    width: 100%; /* Utilize a largura máxima disponível */
`;

const LogoImage = styled.img`
    width: 100%; /* Ocupa toda a largura do contêiner */
    height: auto; /* Altura ajustável para manter proporções */
`;

function Logo() {
    return (
        <LogoContainer>
            <LogoImage src={logo} alt='Logo'/>    
        </LogoContainer>
    );
}

export default Logo;
