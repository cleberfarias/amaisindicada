import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiCheckCircle, FiGlobe, FiMail, FiMessageCircle } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { listarProdutos } from "../services/produtosApi";
import { theme } from "../styles/theme";
import { useLocalizedPath } from "../contexts/LocaleContext";
import ProducaoImage from "../imagens/producao3.jpg";
import ColecaoImage from "../imagens/colecao 1.svg";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Hero = styled.section`
  background: ${theme.colors.brown};
  color: ${theme.colors.white};
`;

const HeroInner = styled.div`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 86px 0;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 42px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: ${theme.colors.warm};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.8rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 640px;
  margin: 22px 0 0;
  color: ${({ $light }) => ($light ? "rgba(255,255,255,0.78)" : theme.colors.brownSoft)};
  line-height: 1.85;
  font-size: 1.05rem;
`;

const HeroImage = styled.div`
  min-height: 430px;
  border-radius: 8px;
  background: url("${ProducaoImage}") center/cover no-repeat;
  border: 1px solid rgba(255, 246, 232, 0.18);
`;

const Section = styled.section`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 76px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  padding: 26px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);

  svg {
    color: ${theme.colors.teal};
    margin-bottom: 14px;
  }

  h2 {
    margin: 0 0 10px;
    font-family: ${theme.fonts.heading};
    font-size: 1.6rem;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.7;
  }
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 34px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.div`
  min-height: 430px;
  border-radius: 8px;
  background: ${theme.colors.white} url("${ColecaoImage}") center/contain no-repeat;
  border: 1px solid ${theme.colors.line};
`;

const Checklist = styled.ul`
  display: grid;
  gap: 14px;
  margin: 24px 0 0;
  padding: 0;
`;

const ChecklistItem = styled.li`
  display: flex;
  gap: 10px;
  list-style: none;
  color: ${theme.colors.brownSoft};
  line-height: 1.6;

  svg {
    flex: 0 0 auto;
    margin-top: 3px;
    color: ${theme.colors.teal};
  }
`;

const ContactBand = styled.section`
  background: ${theme.colors.tealDark};
  color: ${theme.colors.white};
`;

const ContactInner = styled.div`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 64px 0;
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: center;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: ${theme.colors.white};
  background: rgba(255, 255, 255, 0.12);
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.white};
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  display: grid;
  grid-template-rows: 200px auto;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const ProductImageWrap = styled.div`
  display: grid;
  place-items: center;
  padding: 18px;
  background: linear-gradient(180deg, ${theme.colors.white}, ${theme.colors.cream});

  img {
    max-width: 82%;
    max-height: 160px;
    object-fit: contain;
  }
`;

const ProductBody = styled.div`
  display: grid;
  gap: 8px;
  padding: 18px;
`;

const ProductLine = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const ProductName = styled.h3`
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: 1.3rem;
  line-height: 1.05;
`;

const ProductText = styled.p`
  margin: 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.55;
`;

const ProductWhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  margin-top: 6px;
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

function Exportacao() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    listarProdutos().then(setProdutos);
  }, []);

  const produtosExportacao = produtos.filter((produto) => produto.exibirExportacao);

  const message = encodeURIComponent(t("exportacao.contactBand.whatsappMessage"));

  return (
    <Page>
      <Seo titleKey="exportacao.seo.title" descriptionKey="exportacao.seo.description" />
      <Header />
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow><FiGlobe /> {t("exportacao.hero.eyebrow")}</Eyebrow>
            <Title>{t("exportacao.hero.title")}</Title>
            <Lead $light>{t("exportacao.hero.lead")}</Lead>
          </div>
          <HeroImage aria-label="Producao A Mais Indicada" />
        </HeroInner>
      </Hero>

      <Section>
        <Grid>
          <Card>
            <FiCheckCircle size={26} />
            <h2>{t("exportacao.cards.origin.title")}</h2>
            <p>{t("exportacao.cards.origin.text")}</p>
          </Card>
          <Card>
            <FiCheckCircle size={26} />
            <h2>{t("exportacao.cards.portfolio.title")}</h2>
            <p>{t("exportacao.cards.portfolio.text")}</p>
          </Card>
          <Card>
            <FiCheckCircle size={26} />
            <h2>{t("exportacao.cards.contact.title")}</h2>
            <p>{t("exportacao.cards.contact.text")}</p>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Split>
          <ProductImage aria-label="Colecao A Mais Indicada" />
          <div>
            <Eyebrow>{t("exportacao.validate.eyebrow")}</Eyebrow>
            <Title as="h2">{t("exportacao.validate.title")}</Title>
            <Lead>{t("exportacao.validate.lead")}</Lead>

            <Checklist>
              <ChecklistItem><FiCheckCircle /> {t("exportacao.checklist.item1")}</ChecklistItem>
              <ChecklistItem><FiCheckCircle /> {t("exportacao.checklist.item2")}</ChecklistItem>
              <ChecklistItem><FiCheckCircle /> {t("exportacao.checklist.item3")}</ChecklistItem>
              <ChecklistItem><FiCheckCircle /> {t("exportacao.checklist.item4")}</ChecklistItem>
            </Checklist>
          </div>
        </Split>
      </Section>

      {produtosExportacao.length ? (
        <Section>
          <Eyebrow>{t("exportacao.products.eyebrow")}</Eyebrow>
          <Title as="h2">{t("exportacao.products.title")}</Title>
          <Lead style={{ margin: "18px 0 30px" }}>{t("exportacao.products.lead")}</Lead>
          <ProductGrid>
            {produtosExportacao.map((produto) => {
              const productMessage = encodeURIComponent(
                t("exportacao.products.whatsappMessage", { nome: produto.nome })
              );
              return (
                <ProductCard key={produto.id}>
                  <ProductImageWrap>
                    <img src={produto.imagem} alt={produto.nome} />
                  </ProductImageWrap>
                  <ProductBody>
                    <ProductLine>{produto.linha}</ProductLine>
                    <ProductName>{produto.nome}</ProductName>
                    <ProductText>{produto.perfil}</ProductText>
                    <ProductWhatsAppLink href={`https://wa.me/5549999269857?text=${productMessage}`} target="_blank" rel="noreferrer">
                      <FiMessageCircle /> {t("exportacao.products.whatsappButton")}
                    </ProductWhatsAppLink>
                  </ProductBody>
                </ProductCard>
              );
            })}
          </ProductGrid>
        </Section>
      ) : null}

      <ContactBand>
        <ContactInner>
          <div>
            <Eyebrow>{t("exportacao.contactBand.eyebrow")}</Eyebrow>
            <Title as="h2" style={{ color: theme.colors.white, fontSize: "clamp(2rem, 4vw, 3.8rem)" }}>
              {t("exportacao.contactBand.title")}
            </Title>
          </div>
          <Actions>
            <ActionLink href={`https://wa.me/5549999269857?text=${message}`} target="_blank" rel="noreferrer">
              <FiMessageCircle /> {t("exportacao.contactBand.whatsapp")}
            </ActionLink>
            <ActionLink href="mailto:contato@amaisindicada.com.br?subject=Contato comercial - Exportacao">
              <FiMail /> {t("exportacao.contactBand.email")}
            </ActionLink>
            <ActionLink href={lp("/catalogo")}>
              {t("exportacao.contactBand.catalog")} <FiArrowRight />
            </ActionLink>
          </Actions>
        </ContactInner>
      </ContactBand>
      <Footer />
    </Page>
  );
}

export default Exportacao;
