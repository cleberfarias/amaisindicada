import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiEye, FiFilter, FiMessageCircle, FiSearch } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { catalogoProdutos } from "../data/produtos";
import { listarProdutos } from "../services/produtosApi";
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
  padding: 78px 0;
`;

const Hero = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
  margin-bottom: 34px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.teal};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 760px;
  margin: 14px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.8rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 680px;
  margin: 18px 0 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.8;
`;

const Toolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto;
  gap: 12px;
  margin-bottom: 26px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid ${theme.colors.line};
  border-radius: 999px;
  background: ${theme.colors.white};
  color: ${theme.colors.brownSoft};
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  outline: 0;
  color: ${theme.colors.brown};
  background: transparent;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  min-height: 48px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid ${theme.colors.line};
  color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.brown)};
  background: ${({ $active }) => ($active ? theme.colors.teal : theme.colors.white)};
  font-weight: 800;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 1040px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: grid;
  grid-template-rows: 240px auto;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const ImageWrap = styled.div`
  display: grid;
  place-items: center;
  padding: 18px;
  background: linear-gradient(180deg, ${theme.colors.white}, ${theme.colors.cream});
`;

const ProductImage = styled.img`
  max-width: 82%;
  max-height: 220px;
  object-fit: contain;
`;

const CardBody = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
`;

const ProductLine = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ProductName = styled.h2`
  min-height: 58px;
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: 1.45rem;
  line-height: 1.05;
`;

const ProductText = styled.p`
  min-height: 52px;
  margin: 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.55;
`;

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  margin-top: 8px;
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.brown};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.teal};
  }
`;

const DetailLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  border-radius: 999px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  border: 1px solid ${theme.colors.line};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.brown};
    background: ${theme.colors.warm};
  }
`;

const EmptyState = styled.div`
  padding: 40px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.brownSoft};
`;

const ALL_LINHAS = "Todos";

function Catalogo() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const [produtos, setProdutos] = useState(catalogoProdutos);
  const [query, setQuery] = useState("");
  const [linha, setLinha] = useState(ALL_LINHAS);

  useEffect(() => {
    listarProdutos().then(setProdutos);
  }, []);

  const linhas = useMemo(
    () => [ALL_LINHAS, ...Array.from(new Set(produtos.map((produto) => produto.linha)))],
    [produtos]
  );

  const produtosFiltrados = useMemo(() => {
    const termo = query.trim().toLowerCase();
    return produtos.filter((produto) => {
      const matchLinha = linha === ALL_LINHAS || produto.linha === linha;
      const matchQuery = !termo || `${produto.nome} ${produto.linha} ${produto.perfil}`.toLowerCase().includes(termo);
      return matchLinha && matchQuery;
    });
  }, [linha, produtos, query]);

  return (
    <Page>
      <Seo titleKey="catalogo.seo.title" descriptionKey="catalogo.seo.description" />
      <Header />
      <Main>
        <Hero>
          <div>
            <Eyebrow><FiFilter /> {t("catalogo.hero.eyebrow")}</Eyebrow>
            <Title>{t("catalogo.hero.title")}</Title>
            <Lead>{t("catalogo.hero.lead")}</Lead>
          </div>
        </Hero>

        <Toolbar>
          <Field>
            <FiSearch />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("catalogo.searchPlaceholder")}
            />
          </Field>

          <FilterGroup>
            {linhas.map((item) => (
              <FilterButton
                key={item}
                type="button"
                $active={item === linha}
                onClick={() => setLinha(item)}
              >
                {item === ALL_LINHAS ? t("catalogo.filterAll") : item}
              </FilterButton>
            ))}
          </FilterGroup>
        </Toolbar>

        {produtosFiltrados.length ? (
          <Grid>
            {produtosFiltrados.map((produto) => {
              const message = encodeURIComponent(t("catalogo.whatsappMessage", { nome: produto.nome }));
              return (
                <Card key={produto.id}>
                  <ImageWrap>
                    <ProductImage src={produto.imagem} alt={produto.nome} />
                  </ImageWrap>
                  <CardBody>
                    <ProductLine>{produto.linha}</ProductLine>
                    <ProductName>{produto.nome}</ProductName>
                    <ProductText>{produto.perfil}</ProductText>
                    <DetailLink to={lp(`/produto/${produto.id}`)}>
                      <FiEye /> {t("catalogo.detailsButton")}
                    </DetailLink>
                    <WhatsAppLink href={`https://wa.me/5549999269857?text=${message}`} target="_blank" rel="noreferrer">
                      <FiMessageCircle /> {t("catalogo.whatsappButton")}
                    </WhatsAppLink>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>
        ) : (
          <EmptyState>{t("catalogo.empty")}</EmptyState>
        )}
      </Main>
      <Footer />
    </Page>
  );
}

export default Catalogo;
