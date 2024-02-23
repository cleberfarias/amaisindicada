import FooterOpcoes from "../FooterOpcoes/FooterOpcoes";
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 20px;
  background-color: #333;
  color: white;
  text-align: center;

  @media screen and (max-width: 768px) {
    padding: 10px;
    font-size: 14px;
  }
`;

function Footer(){
    return(
        <StyledFooter>
            <FooterOpcoes/>
        </StyledFooter>
    )
}
export default Footer;
