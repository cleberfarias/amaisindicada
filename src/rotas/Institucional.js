import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiClock, FiHeart, FiMapPin, FiShield } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import { theme } from "../styles/theme";
import Familia from "../imagens/Familia completa (2) 1.png";
import MarizeteIziario from "../imagens/Marizete e Iziario (1) 1.png";
import Geral from "../imagens/Geral (2) 1.png";
import Producao from "../imagens/producao3.jpg";

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
  padding: 88px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.warm};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.8rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 680px;
  margin: 20px 0 0;
  color: ${({ $light }) => ($light ? "rgba(255,255,255,0.78)" : theme.colors.brownSoft)};
  line-height: 1.85;
  font-size: 1.05rem;
`;

const HeroImage = styled.div`
  min-height: 480px;
  border-radius: 8px;
  background: url("${Familia}") center/cover no-repeat;
  border: 1px solid rgba(255, 246, 232, 0.18);

  @media (max-width: 760px) {
    min-height: 340px;
  }
`;

const Section = styled.section`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 78px 0;
`;

const Timeline = styled.div`
  display: grid;
  gap: 22px;
`;

const TimelineItem = styled.article`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 28px;
  padding: 28px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Year = styled.div`
  color: ${theme.colors.tealDark};
  font-family: ${theme.fonts.heading};
  font-size: 2rem;
  font-weight: 800;
`;

const ItemContent = styled.div`
  h2 {
    margin: 0 0 10px;
    font-family: ${theme.fonts.heading};
    font-size: 1.8rem;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.8;
  }
`;

const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePanel = styled.div`
  min-height: 430px;
  border-radius: 8px;
  background: url("${({ $image }) => $image}") center/cover no-repeat;
  border: 1px solid ${theme.colors.line};
`;

const TextPanel = styled.div`
  padding: clamp(24px, 4vw, 46px);
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};

  p {
    color: ${theme.colors.brownSoft};
    line-height: 1.85;
  }
`;

const ProofGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ProofCard = styled.article`
  padding: 22px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};

  svg {
    margin-bottom: 12px;
    color: ${theme.colors.teal};
  }

  h2 {
    margin: 0 0 8px;
    font-size: 1rem;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.6;
  }
`;

function Institucional() {
  const { t } = useTranslation();

  return (
    <Page>
      <Header />
      <Hero>
        <HeroInner>
          <div>
            <Eyebrow><FiHeart /> {t("institucional.hero.eyebrow")}</Eyebrow>
            <Title>{t("institucional.hero.title")}</Title>
            <Lead $light>{t("institucional.hero.lead")}</Lead>
          </div>
          <HeroImage aria-label="Familia A Mais Indicada" />
        </HeroInner>
      </Hero>

      <Section>
        <Timeline>
          <TimelineItem>
            <Year>{t("institucional.timeline.item1.year")}</Year>
            <ItemContent>
              <h2>{t("institucional.timeline.item1.title")}</h2>
              <p>{t("institucional.timeline.item1.text")}</p>
            </ItemContent>
          </TimelineItem>

          <TimelineItem>
            <Year>{t("institucional.timeline.item2.year")}</Year>
            <ItemContent>
              <h2>{t("institucional.timeline.item2.title")}</h2>
              <p>{t("institucional.timeline.item2.text")}</p>
            </ItemContent>
          </TimelineItem>

          <TimelineItem>
            <Year>{t("institucional.timeline.item3.year")}</Year>
            <ItemContent>
              <h2>{t("institucional.timeline.item3.title")}</h2>
              <p>{t("institucional.timeline.item3.text")}</p>
            </ItemContent>
          </TimelineItem>
        </Timeline>
      </Section>

      <Section>
        <Split>
          <ImagePanel $image={MarizeteIziario} aria-label="Marizete e Iziario" />
          <TextPanel>
            <Eyebrow>{t("institucional.process.eyebrow")}</Eyebrow>
            <Title as="h2">{t("institucional.process.title")}</Title>
            <p>{t("institucional.process.text")}</p>
          </TextPanel>
        </Split>
      </Section>

      <Section>
        <Split>
          <TextPanel>
            <Eyebrow>{t("institucional.today.eyebrow")}</Eyebrow>
            <Title as="h2">{t("institucional.today.title")}</Title>
            <p>{t("institucional.today.text")}</p>
          </TextPanel>
          <ImagePanel $image={Geral} aria-label="Produtos A Mais Indicada" />
        </Split>
      </Section>

      <Section>
        <ProofGrid>
          <ProofCard>
            <FiMapPin size={24} />
            <h2>{t("institucional.proof.origin.title")}</h2>
            <p>{t("institucional.proof.origin.text")}</p>
          </ProofCard>
          <ProofCard>
            <FiHeart size={24} />
            <h2>{t("institucional.proof.family.title")}</h2>
            <p>{t("institucional.proof.family.text")}</p>
          </ProofCard>
          <ProofCard>
            <FiClock size={24} />
            <h2>{t("institucional.proof.since.title")}</h2>
            <p>{t("institucional.proof.since.text")}</p>
          </ProofCard>
          <ProofCard>
            <FiShield size={24} />
            <h2>{t("institucional.proof.responsible.title")}</h2>
            <p>{t("institucional.proof.responsible.text")}</p>
          </ProofCard>
        </ProofGrid>
      </Section>

      <Section>
        <Split>
          <ImagePanel $image={Producao} aria-label="Alambique de cobre" />
          <TextPanel>
            <Eyebrow>{t("institucional.nextPhase.eyebrow")}</Eyebrow>
            <Title as="h2">{t("institucional.nextPhase.title")}</Title>
            <p>{t("institucional.nextPhase.text")}</p>
          </TextPanel>
        </Split>
      </Section>

      <Footer />
    </Page>
  );
}

export default Institucional;
