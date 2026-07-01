import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { FiEdit3, FiLock, FiMail, FiMapPin } from "react-icons/fi";
import { theme } from "../../styles/theme";
import { useLocalizedPath } from "../../contexts/LocaleContext";

const FooterContainer = styled.footer`
  background: ${theme.colors.brown};
  color: ${theme.colors.cream};
`;

const FooterInner = styled.div`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 56px 0 28px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 32px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FooterTitle = styled.h2`
  margin: 0 0 14px;
  font-family: ${theme.fonts.heading};
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
`;

const FooterText = styled.p`
  max-width: 520px;
  margin: 0;
  color: rgba(255, 246, 232, 0.78);
  line-height: 1.8;
`;

const ColumnTitle = styled.h3`
  margin: 0 0 16px;
  color: ${theme.colors.warm};
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FooterList = styled.ul`
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
`;

const FooterListItem = styled.li`
  list-style: none;
`;

const FooterLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: rgba(255, 246, 232, 0.82);
  text-decoration: none;
  line-height: 1.5;

  &:hover {
    color: ${theme.colors.warm};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 44px;
  padding-top: 22px;
  border-top: 1px solid rgba(255, 246, 232, 0.18);
  color: rgba(255, 246, 232, 0.68);
  font-size: 0.86rem;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

function Footer() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();

  return (
    <FooterContainer>
      <FooterInner>
        <FooterGrid>
          <div>
            <FooterTitle>{t("footer.brand.title")}</FooterTitle>
            <FooterText>{t("footer.brand.text")}</FooterText>
          </div>

          <div>
            <ColumnTitle>{t("footer.columns.contact")}</ColumnTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="mailto:contato@amaisindicada.com.br">
                  <FiMail /> contato@amaisindicada.com.br
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="https://contate.me/amaisindicada" target="_blank" rel="noreferrer">
                  <ImWhatsapp /> +55 (49) 99926-9857
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="https://www.instagram.com/maisindicada/" target="_blank" rel="noreferrer">
                  <FaInstagram /> @maisindicada
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink as={Link} to={lp("/blog")}>
                  <FiEdit3 /> {t("footer.blog")}
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </div>

          <div>
            <ColumnTitle>{t("footer.columns.addresses")}</ColumnTitle>
            <FooterList>
              <FooterListItem>
                <FooterLink href="https://www.google.com/maps?q=-27.65963231609629,-51.35811403175321" target="_blank" rel="noreferrer">
                  <FiMapPin /> Celso Ramos, SC
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink href="https://www.google.com/maps/d/viewer?mid=17VkTD20t_JdHAH97UhqKjxpVCvnsD3o&ll=-27.81435009999997%2C-50.3361287&z=17" target="_blank" rel="noreferrer">
                  <FiMapPin /> Lages, SC
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink as="a" href="/admin">
                  <FiLock /> {t("footer.admin")}
                </FooterLink>
              </FooterListItem>
            </FooterList>
          </div>
        </FooterGrid>

        <FooterBottom>
          <span>{t("footer.bottom.copyright")}</span>
          <span>{t("footer.bottom.note")}</span>
        </FooterBottom>
      </FooterInner>
    </FooterContainer>
  );
}

export default Footer;
