import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiBarChart2, FiBox, FiEdit3 } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Seo from "../componentes/Seo/Seo";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import AdminShell from "../componentes/AdminShell/AdminShell";
import AdminAuthGate from "../componentes/AdminShell/AdminAuthGate";
import { theme } from "../styles/theme";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0;
`;

const Eyebrow = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 820px;
  margin: 12px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.4rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 760px;
  margin: 18px 0 26px;
  color: ${theme.colors.brownSoft};
  line-height: 1.75;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: grid;
  gap: 18px;
  min-height: 220px;
  padding: 28px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  text-decoration: none;
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);

  svg {
    color: ${theme.colors.teal};
  }

  h2 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: 2.2rem;
    line-height: 1;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.6;
  }

  &:hover {
    border-color: ${theme.colors.teal};
  }
`;

function AdminHome() {
  return (
    <Page>
      <Seo noindex title="Admin | A Mais Indicada" />
      <Header />
      <Main>
        <Eyebrow>Administrativo</Eyebrow>
        <Title>Painel da A Mais Indicada.</Title>
        <Lead>
          Escolha a area que deseja administrar. Produtos controla o catalogo
          dinamico; Marketing controla banners e chamadas do site; Blog controla
          os artigos publicados.
        </Lead>

        <AdminAuthGate>
          <AdminShell />

          <Grid>
            <Card to="/admin/produtos">
              <FiBox size={32} />
              <div>
                <h2>Produtos</h2>
                <p>Cadastrar, editar, publicar, ocultar e organizar produtos do catalogo.</p>
              </div>
            </Card>

            <Card to="/admin/marketing">
              <FiBarChart2 size={32} />
              <div>
                <h2>Marketing</h2>
                <p>Trocar banners, imagens, textos e botoes das campanhas do site.</p>
              </div>
            </Card>

            <Card to="/admin/blog">
              <FiEdit3 size={32} />
              <div>
                <h2>Blog</h2>
                <p>Escrever, editar, publicar e remover artigos do blog.</p>
              </div>
            </Card>
          </Grid>
        </AdminAuthGate>
      </Main>
      <Footer />
    </Page>
  );
}

export default AdminHome;
