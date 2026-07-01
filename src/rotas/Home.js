import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiGlobe, FiMessageCircle, FiShield } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { produtosDestaque, perfisRecomendacao } from "../data/produtos";
import { listarBanners, listarProdutos } from "../services/produtosApi";
import { theme } from "../styles/theme";
import { useLocalizedPath } from "../contexts/LocaleContext";
import HeroImage from "../imagens/Geral (2) 1.png";
import FamiliaImage from "../imagens/Familia completa (2) 1.png";
import Logo from "../imagens/Logo.png";
import ProducaoImage from "../imagens/producao3.jpg";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Section = styled.section`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: ${({ $compact }) => ($compact ? "56px 0" : "86px 0")};
`;

const Hero = styled.section`
  position: relative;
  min-height: 680px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${theme.colors.brown};

  @media (max-width: 900px) {
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  position: relative;
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 42px;
  align-items: center;
  color: ${theme.colors.white};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 48px 0;
  }
`;

const HeroCopy = styled.div`
  max-width: 620px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: ${theme.colors.warm};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 760px;
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(3.2rem, 8vw, 7.2rem);
  line-height: 0.92;
  font-weight: 800;
`;

const HeroText = styled.p`
  max-width: 620px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.8;
`;

const HeroPhoto = styled.figure`
  min-height: 510px;
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 246, 232, 0.18);
  border-radius: 8px;
  background: rgba(255, 246, 232, 0.06);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.24);

  img {
    display: block;
    width: 100%;
    height: 510px;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 900px) {
    min-height: 320px;

    img {
      height: 320px;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 34px;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid ${({ $variant }) => ($variant === "light" ? "rgba(255,255,255,0.28)" : theme.colors.brown)};
  color: ${({ $variant }) => ($variant === "light" ? theme.colors.white : theme.colors.white)};
  background: ${({ $variant }) => ($variant === "light" ? "rgba(255,255,255,0.1)" : theme.colors.teal)};
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: ${theme.colors.white};
    background: ${({ $variant }) => ($variant === "light" ? "rgba(255,255,255,0.18)" : theme.colors.tealDark)};
    transform: translateY(-1px);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: end;
  margin-bottom: 30px;

  @media (max-width: 760px) {
    align-items: start;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  max-width: 680px;
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1;
  color: ${theme.colors.brown};
`;

const Lead = styled.p`
  max-width: 560px;
  margin: 14px 0 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.8;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  min-height: 330px;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 20px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  h3 {
    margin: 0 0 6px;
    font-family: ${theme.fonts.heading};
    font-size: 1.35rem;
  }

  span {
    display: inline-flex;
    margin-bottom: 10px;
    color: ${theme.colors.tealDark};
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.6;
  }
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePanel = styled.figure`
  min-height: 520px;
  margin: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  overflow: hidden;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.line};

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 520px;
    object-fit: contain;
  }

  @media (max-width: 860px) {
    min-height: 360px;

    img {
      max-height: 360px;
    }
  }
`;

const TextPanel = styled.div`
  padding: clamp(26px, 5vw, 58px);
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};

  p {
    color: ${theme.colors.brownSoft};
    line-height: 1.85;
  }
`;

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 28px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ProofCard = styled.div`
  padding: 22px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid ${theme.colors.line};

  svg {
    color: ${theme.colors.teal};
    margin-bottom: 12px;
  }

  strong {
    display: block;
    margin-bottom: 6px;
    color: ${theme.colors.brown};
  }

  span {
    color: ${theme.colors.brownSoft};
    line-height: 1.6;
  }
`;

const Recommender = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 24px;
  padding: clamp(24px, 5vw, 42px);
  border-radius: 8px;
  background: ${theme.colors.brown};
  color: ${theme.colors.white};

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const OptionButton = styled.button`
  min-height: 48px;
  border-radius: 999px;
  border: 1px solid rgba(255, 246, 232, 0.24);
  color: ${({ $active }) => ($active ? theme.colors.brown : theme.colors.cream)};
  background: ${({ $active }) => ($active ? theme.colors.warm : "rgba(255, 246, 232, 0.08)")};
  font-weight: 800;
`;

const ResultBox = styled.div`
  padding: 24px;
  border-radius: 8px;
  background: rgba(255, 246, 232, 0.1);
  border: 1px solid rgba(255, 246, 232, 0.18);

  h3 {
    margin: 0 0 10px;
    font-family: ${theme.fonts.heading};
    font-size: 2rem;
  }

  p {
    color: rgba(255, 246, 232, 0.78);
    line-height: 1.7;
  }
`;

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: ${theme.colors.warm};
  font-weight: 800;
  text-decoration: none;
`;

const ExportBand = styled.section`
  background: ${theme.colors.tealDark};
  color: ${theme.colors.white};
`;

const ExportInner = styled.div`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 74px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ExportImage = styled.div`
  min-height: 360px;
  border-radius: 8px;
  background: url("${ProducaoImage}") center/cover no-repeat;
`;

function Home() {
  const { t } = useTranslation();
  const lp = useLocalizedPath();
  const [produtos, setProdutos] = useState(produtosDestaque);
  const [banner, setBanner] = useState({
    titulo: "A Mais Indicada",
    subtitulo:
      "Uma marca familiar com sabores brasileiros, processo artesanal e uma nova presenca digital preparada para varejo, distribuidores e conversas de exportacao.",
    selo: "Cachacas e licores artesanais de Santa Catarina",
    imagem: HeroImage,
    imagemAlt: "Produtos A Mais Indicada em exposicao",
    ctaPrincipalTexto: "Ver catalogo",
    ctaPrincipalUrl: "/catalogo",
    ctaSecundarioTexto: "Area de exportacao",
    ctaSecundarioUrl: "/exportacao",
  });
  const [selectedProfile, setSelectedProfile] = useState(perfisRecomendacao[0].id);
  const recommendation = useMemo(
    () => perfisRecomendacao.find((profile) => profile.id === selectedProfile) || perfisRecomendacao[0],
    [selectedProfile]
  );
  const destaque = useMemo(() => {
    const produtosDestacados = produtos.filter((produto) => produto.destaque);
    return (produtosDestacados.length ? produtosDestacados : produtos).slice(0, 8);
  }, [produtos]);

  useEffect(() => {
    listarProdutos().then(setProdutos);
    listarBanners().then((banners) => {
      const homeBanner = banners.find((item) => item.area === "home-hero") || banners[0];
      if (homeBanner) {
        setBanner((current) => ({ ...current, ...homeBanner, imagem: homeBanner.imagem || current.imagem }));
      }
    });
  }, []);

  const whatsappMessage = encodeURIComponent(
    t("home.recommender.whatsappMessage", { sugestao: recommendation.sugestao })
  );

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A Mais Indicada",
    url: "https://amaisindicada.com.br",
    logo: `https://amaisindicada.com.br${Logo}`,
    sameAs: ["https://www.instagram.com/maisindicada/"],
  };

  return (
    <Page>
      <Seo titleKey="home.seo.title" descriptionKey="home.seo.description" jsonLd={organizationJsonLd} />
      <Header />

      <Hero>
        <HeroContent>
          <HeroCopy>
            <Eyebrow>{banner.selo}</Eyebrow>
            <HeroTitle>{banner.titulo}</HeroTitle>
            <HeroText>
              {banner.subtitulo}
            </HeroText>
            <Actions>
              <Button to={lp(banner.ctaPrincipalUrl || "/catalogo")}>
                {banner.ctaPrincipalTexto || "Ver catalogo"} <FiArrowRight />
              </Button>
              <Button to={lp(banner.ctaSecundarioUrl || "/exportacao")} $variant="light">
                {banner.ctaSecundarioTexto || "Area de exportacao"} <FiGlobe />
              </Button>
            </Actions>
          </HeroCopy>
          <HeroPhoto>
            <img src={banner.imagem || HeroImage} alt={banner.imagemAlt || "Produtos A Mais Indicada em exposicao"} />
          </HeroPhoto>
        </HeroContent>
      </Hero>

      <Section>
        <SectionHeader>
          <div>
            <Eyebrow>{t("home.portfolio.eyebrow")}</Eyebrow>
            <Title>{t("home.portfolio.title")}</Title>
            <Lead>{t("home.portfolio.lead")}</Lead>
          </div>
          <Button to={lp("/catalogo")}>{t("home.portfolio.cta")}</Button>
        </SectionHeader>

        <ProductGrid>
          {destaque.map((produto) => (
            <ProductCard key={produto.id}>
              <ProductImage src={produto.imagem} alt={produto.nome} />
              <ProductInfo>
                <span>{produto.linha}</span>
                <h3>{produto.nome}</h3>
                <p>{produto.perfil}</p>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductGrid>
      </Section>

      <Section $compact>
        <Recommender>
          <div>
            <Eyebrow>{t("home.recommender.eyebrow")}</Eyebrow>
            <Title style={{ color: theme.colors.white }}>{t("home.recommender.title")}</Title>
            <Lead style={{ color: "rgba(255, 246, 232, 0.78)" }}>{t("home.recommender.lead")}</Lead>
          </div>

          <div>
            <OptionGrid>
              {perfisRecomendacao.map((profile) => (
                <OptionButton
                  key={profile.id}
                  type="button"
                  $active={profile.id === selectedProfile}
                  onClick={() => setSelectedProfile(profile.id)}
                >
                  {t(`home.recommender.profiles.${profile.id}.label`)}
                </OptionButton>
              ))}
            </OptionGrid>

            <ResultBox>
              <h3>{recommendation.sugestao}</h3>
              <p>{t(`home.recommender.profiles.${recommendation.id}.motivo`)}</p>
              <WhatsAppLink
                href={`https://wa.me/5549999269857?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                <FiMessageCircle /> {t("home.recommender.whatsapp")}
              </WhatsAppLink>
            </ResultBox>
          </div>
        </Recommender>
      </Section>

      <Section>
        <StoryGrid>
          <ImagePanel>
            <img src={FamiliaImage} alt="Familia A Mais Indicada" />
          </ImagePanel>
          <TextPanel>
            <Eyebrow>{t("home.story.eyebrow")}</Eyebrow>
            <Title>{t("home.story.title")}</Title>
            <p>{t("home.story.text")}</p>

            <ProofGrid>
              <ProofCard>
                <FiShield size={24} />
                <strong>{t("home.story.proof.responsible.title")}</strong>
                <span>{t("home.story.proof.responsible.text")}</span>
              </ProofCard>
              <ProofCard>
                <FiMessageCircle size={24} />
                <strong>{t("home.story.proof.support.title")}</strong>
                <span>{t("home.story.proof.support.text")}</span>
              </ProofCard>
              <ProofCard>
                <FiGlobe size={24} />
                <strong>{t("home.story.proof.export.title")}</strong>
                <span>{t("home.story.proof.export.text")}</span>
              </ProofCard>
            </ProofGrid>
          </TextPanel>
        </StoryGrid>
      </Section>

      <ExportBand>
        <ExportInner>
          <div>
            <Eyebrow>{t("home.exportBand.eyebrow")}</Eyebrow>
            <Title style={{ color: theme.colors.white }}>{t("home.exportBand.title")}</Title>
            <Lead style={{ color: "rgba(255,255,255,0.78)" }}>{t("home.exportBand.lead")}</Lead>
            <Actions>
              <Button to={lp("/exportacao")}>{t("home.exportBand.ctaPrimary")}</Button>
              <Button to={lp("/contato")} $variant="light">{t("home.exportBand.ctaSecondary")}</Button>
            </Actions>
          </div>
          <ExportImage aria-label="Producao artesanal A Mais Indicada" />
        </ExportInner>
      </ExportBand>

      <Footer />
    </Page>
  );
}

export default Home;
