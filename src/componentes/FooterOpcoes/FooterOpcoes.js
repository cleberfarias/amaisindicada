import React from 'react';
import styled from 'styled-components';
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";

const FooterContainer = styled.footer`
  background: linear-gradient(to right,#ffffff, #663300);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-around;
  }

  @media screen and (min-width: 1728px) {
    padding: 3em 0;
  }
`;

const FooterTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 1em;

  @media screen and (min-width: 1024px) {
    order: -1; /* Muda a ordem no layout para que o título fique à esquerda */
  }
`;

const FooterList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    gap: 16px;
  }
`;

const FooterListItem = styled.li`
  margin: 0.6em 0;
  font-size: 14px;
  text-decoration: none;
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
      <FooterTitle>A Mais Indicada &copy; 2023</FooterTitle>

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
          <FooterLink href="mailto:contato@amaisindicada.com.br">E-mail: contato@amaisindicada.com.br</FooterLink>
        </FooterListItem>
        <FooterListItem>
          <FooterLink href="https://contate.me/amaisindicada" target="_blank">
            Contato: <ImWhatsapp /> +55(49)99926-9857
          </FooterLink>
          
          

        </FooterListItem>
        <FooterLink href="https://www.instagram.com/maisindicada/" target="_blank"><InstagramIcon/>@maisindicada</FooterLink>
      </FooterList>

      
      <FooterLink href="/privacidade.html" target="_blank">
          Política de Privacidade
          </FooterLink>

          <FooterLink href="/termos.html" target="_blank">
          Termos de Uso
          </FooterLink>
          <FooterLink href="/quemsomos.html" target="_blank">
          Quem Somos
          </FooterLink>
    </FooterContainer>
    
    
  );
}

export default Footer;
