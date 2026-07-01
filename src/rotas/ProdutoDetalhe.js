import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiMessageCircle } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import { catalogoProdutos } from "../data/produtos";
import { buscarProduto } from "../services/produtosApi";
import { theme } from "../styles/theme";
import { useLocalizedPath } from "../contexts/LocaleContext";

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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  color: ${theme.colors.tealDark};
  font-weight: 800;
  text-decoration: none;
`;

const ProductGrid = styled.section`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 36px;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePanel = styled.div`
  min-height: 560px;
  display: grid;
  place-items: center;
  padding: 36px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);

  img {
    width: min(360px, 100%);
    max-height: 500px;
    object-fit: contain;
  }
`;

const Content = styled.div`
  padding: clamp(24px, 4vw, 46px);
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const Eyebrow = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  margin: 22px 0 0;
  color: ${theme.colors.brownSoft};
  font-size: 1.08rem;
  line-height: 1.85;
`;

const Specs = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 28px 0;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Spec = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: ${theme.colors.cream};

  dt {
    color: ${theme.colors.goldDark};
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  dd {
    margin: 6px 0 0;
    color: ${theme.colors.brown};
    font-weight: 700;
  }
`;

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.teal};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.tealDark};
  }
`;

const EmptyState = styled.section`
  padding: 48px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

function ProdutoDetalhe() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const { id } = useParams();
  const [produto, setProduto] = useState(catalogoProdutos.find((item) => item.id === id));

  useEffect(() => {
    buscarProduto(id).then(setProduto);
  }, [id]);

  if (!produto) {
    return (
      <Page>
        <Header />
        <Main>
          <EmptyState>
            <BackLink to={lp("/catalogo")}>
              <FiArrowLeft /> {t("produtoDetalhe.back")}
            </BackLink>
            <Title>{t("produtoDetalhe.notFoundTitle")}</Title>
            <Lead>{t("produtoDetalhe.notFoundText")}</Lead>
          </EmptyState>
        </Main>
        <Footer />
      </Page>
    );
  }

  const message = encodeURIComponent(t("produtoDetalhe.whatsappMessage", { nome: produto.nome }));
  const specFallback = t("produtoDetalhe.specFallback");

  return (
    <Page>
      <Header />
      <Main>
        <BackLink to={lp("/catalogo")}>
          <FiArrowLeft /> {t("produtoDetalhe.back")}
        </BackLink>
        <ProductGrid>
          <ImagePanel>
            <img src={produto.imagem} alt={produto.nome} />
          </ImagePanel>
          <Content>
            <Eyebrow>{produto.linha}</Eyebrow>
            <Title>{produto.nome}</Title>
            <Lead>{produto.perfil}</Lead>

            <Specs>
              <Spec>
                <dt>{t("produtoDetalhe.specs.linha")}</dt>
                <dd>{produto.linha}</dd>
              </Spec>
              <Spec>
                <dt>{t("produtoDetalhe.specs.perfil")}</dt>
                <dd>{produto.perfil}</dd>
              </Spec>
              <Spec>
                <dt>{t("produtoDetalhe.specs.volume")}</dt>
                <dd>{produto.volume || specFallback}</dd>
              </Spec>
              <Spec>
                <dt>{t("produtoDetalhe.specs.teor")}</dt>
                <dd>{produto.teorAlcoolico || specFallback}</dd>
              </Spec>
              <Spec>
                <dt>{t("produtoDetalhe.specs.embalagem")}</dt>
                <dd>{produto.embalagem || specFallback}</dd>
              </Spec>
              <Spec>
                <dt>{t("produtoDetalhe.specs.ingredientes")}</dt>
                <dd>{produto.ingredientes || specFallback}</dd>
              </Spec>
            </Specs>

            {produto.descricaoLonga ? <Lead>{produto.descricaoLonga}</Lead> : null}

            <WhatsAppLink href={`https://wa.me/5549999269857?text=${message}`} target="_blank" rel="noreferrer">
              <FiMessageCircle /> {t("produtoDetalhe.whatsappButton")}
            </WhatsAppLink>
          </Content>
        </ProductGrid>
      </Main>
      <Footer />
    </Page>
  );
}

export default ProdutoDetalhe;
