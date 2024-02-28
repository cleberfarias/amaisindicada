import React from 'react';
import styled from 'styled-components';
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";

const FooterContainer = styled.footer`
  background: linear-gradient(to right, #ffffff, #663300);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 2em;
  }
`;

const FooterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5em;

  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const FooterTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 1em;
`;

const FooterList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterListItem = styled.li`
  margin: 0.6em 0;
  font-size: 14px;
`;

const FooterLink = styled.a`
  color: #FFF;
  text-decoration: none;
  margin-left: 0.6em;
`;

const InstagramIcon = styled(FaInstagram)`
  font-size: 24px;
  margin-right: 16px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterBlock>
        <FooterTitle>A Mais Indicada &copy; 2023</FooterTitle>
      </FooterBlock>

      <FooterBlock>
        <FooterList>
          <FooterListItem>
            <FooterLink href='/institucional'>Alambique</FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href='/institucional'>Armazém</FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href="https://www.google.com/maps?q=-27.65963231609629,-51.35811403175321" target="_blank">
              Celso Ramos, Santa Catarina - Ver no Mapa
            </FooterLink>
          </FooterListItem>
          <FooterListItem>
          <FooterLink href="https://www.google.com/maps/d/viewer?mid=17VkTD20t_JdHAH97UhqKjxpVCvnsD3o&ll=-27.81435009999997%2C-50.3361287&z=17" target="_blank">
              Lages, Santa Catarina - Ver no Mapa
            </FooterLink>
            </FooterListItem>
        </FooterList>
      </FooterBlock>

      <FooterBlock>
        <FooterList>
          <FooterListItem>
            <FooterLink href="mailto:contato@amaisindicada.com.br">E-mail: contato@amaisindicada.com.br</FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href="https://contate.me/amaisindicada" target="_blank">
              Contato: <ImWhatsapp /> +55(49)99926-9857
            </FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href="https://www.instagram.com/maisindicada/" target="_blank">
              <InstagramIcon/>@maisindicada
            </FooterLink>
          </FooterListItem>
        </FooterList>
      </FooterBlock>

      <FooterBlock>
        <FooterList>
          <FooterListItem>
            <FooterLink href="/privacidade.html" target="_blank">
              Política de Privacidade
            </FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href="/termos.html" target="_blank">
              Termos de Uso
            </FooterLink>
          </FooterListItem>
          <FooterListItem>
            <FooterLink href="/quemsomos.html" target="_blank">
              Quem Somos
            </FooterLink>
          </FooterListItem>
        </FooterList>
      </FooterBlock>
    </FooterContainer>
  );
}

export default Footer;
