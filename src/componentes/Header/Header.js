import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiMenu, FiSettings, FiX } from "react-icons/fi";
import Logo from "../../imagens/Logo.png";
import { theme } from "../../styles/theme";
import { useLocalizedPath, useLocaleSwitchLinks } from "../../contexts/LocaleContext";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid ${theme.colors.line};
  backdrop-filter: blur(16px);
`;

const HeaderInner = styled.div`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  min-height: 82px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: ${theme.colors.brown};
`;

const BrandLogo = styled.img`
  width: 92px;
  height: auto;
  display: block;
`;

const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  font-family: ${theme.fonts.body};
  font-size: 0.72rem;
  line-height: 1.4;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${theme.colors.brownSoft};

  strong {
    font-family: ${theme.fonts.heading};
    font-size: 1.05rem;
    letter-spacing: 0;
    text-transform: none;
    color: ${theme.colors.brown};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 820px) {
    position: absolute;
    left: 16px;
    right: 16px;
    top: 90px;
    display: ${({ $open }) => ($open ? "flex" : "none")};
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors.line};
    box-shadow: 0 18px 50px rgba(48, 38, 29, 0.16);
  }
`;

const NavigationLink = styled(NavLink)`
  padding: 10px 14px;
  color: ${theme.colors.brown};
  border-radius: 999px;
  font-family: ${theme.fonts.body};
  font-size: 0.92rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover,
  &.active {
    color: ${theme.colors.tealDark};
    background: rgba(34, 119, 139, 0.1);
  }
`;

const PrimaryLink = styled(NavigationLink)`
  color: ${theme.colors.white};
  background: ${theme.colors.brown};

  &:hover,
  &.active {
    color: ${theme.colors.white};
    background: ${theme.colors.teal};
  }
`;

const AdminLink = styled(NavigationLink)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
`;

const LangSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 4px;
  padding-left: 10px;
  border-left: 1px solid ${theme.colors.line};

  @media (max-width: 820px) {
    margin-left: 0;
    padding-left: 0;
    border-left: 0;
    justify-content: center;
  }
`;

const LangButton = styled(Link)`
  padding: 6px 8px;
  border-radius: 999px;
  color: ${({ $active }) => ($active ? theme.colors.tealDark : theme.colors.brownSoft)};
  background: ${({ $active }) => ($active ? "rgba(34, 119, 139, 0.1)" : "transparent")};
  font-size: 0.78rem;
  font-weight: 800;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
    color: ${theme.colors.tealDark};
  }
`;

const MenuButton = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border: 1px solid ${theme.colors.line};
  border-radius: 50%;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  align-items: center;
  justify-content: center;

  @media (max-width: 820px) {
    display: inline-flex;
  }
`;

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const { isLocalized, links, current } = useLocaleSwitchLinks();

  const closeMenu = () => setMenuOpen(false);

  return (
    <HeaderContainer>
      <HeaderInner>
        <Brand to={lp("/")} onClick={closeMenu} aria-label={t("header.brand.name")}>
          <BrandLogo src={Logo} alt={t("header.brand.name")} />
          <BrandText>
            <strong>{t("header.brand.name")}</strong>
            {t("header.brand.tagline")}
          </BrandText>
        </Brand>

        <MenuButton
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
        </MenuButton>

        <Nav $open={menuOpen}>
          <NavigationLink to={lp("/")} end onClick={closeMenu}>
            {t("header.nav.inicio")}
          </NavigationLink>
          <NavigationLink to={lp("/institucional")} onClick={closeMenu}>
            {t("header.nav.historia")}
          </NavigationLink>
          <NavigationLink to={lp("/catalogo")} onClick={closeMenu}>
            {t("header.nav.catalogo")}
          </NavigationLink>
          <NavigationLink to={lp("/exportacao")} onClick={closeMenu}>
            {t("header.nav.exportacao")}
          </NavigationLink>
          <NavigationLink to={lp("/blog")} onClick={closeMenu}>
            {t("header.nav.blog")}
          </NavigationLink>
          <PrimaryLink to={lp("/contato")} onClick={closeMenu}>
            {t("header.nav.contato")}
          </PrimaryLink>
          <AdminLink to="/admin" onClick={closeMenu}>
            <FiSettings /> {t("header.nav.admin")}
          </AdminLink>
          {isLocalized ? (
            <LangSwitcher>
              <LangButton to={links.pt} $active={current === "pt"} onClick={closeMenu}>
                PT
              </LangButton>
              <LangButton to={links.en} $active={current === "en"} onClick={closeMenu}>
                EN
              </LangButton>
              <LangButton to={links.es} $active={current === "es"} onClick={closeMenu}>
                ES
              </LangButton>
            </LangSwitcher>
          ) : null}
        </Nav>
      </HeaderInner>
    </HeaderContainer>
  );
}

export default Header;
