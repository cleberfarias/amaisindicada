import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import { FiArrowLeft } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { buscarPost } from "../services/blogApi";
import { theme } from "../styles/theme";
import { useLocalizedPath } from "../contexts/LocaleContext";

const dateLocale = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(820px, calc(100% - 32px));
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

const CoverImage = styled.img`
  width: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 28px;
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
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  line-height: 1.05;
`;

const Content = styled.div`
  margin-top: 28px;
  color: ${theme.colors.brown};
  line-height: 1.85;
  font-size: 1.05rem;

  h1,
  h2,
  h3 {
    font-family: ${theme.fonts.heading};
    line-height: 1.15;
  }

  a {
    color: ${theme.colors.tealDark};
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

const EmptyState = styled.section`
  padding: 48px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const formatDate = (value, locale) => {
  try {
    return new Date(value).toLocaleDateString(locale);
  } catch (error) {
    return "";
  }
};

function PostDetalhe() {
  const { t, i18n } = useTranslation();
  const lp = useLocalizedPath();
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const locale = dateLocale[i18n.language] || dateLocale.pt;

  useEffect(() => {
    setLoaded(false);
    buscarPost(slug).then((result) => {
      setPost(result);
      setLoaded(true);
    });
  }, [slug]);

  if (loaded && !post) {
    return (
      <Page>
        <Seo noindex title={t("postDetalhe.notFound")} />
        <Header />
        <Main>
          <EmptyState>
            <BackLink to={lp("/blog")}>
              <FiArrowLeft /> {t("postDetalhe.back")}
            </BackLink>
            <Title>{t("postDetalhe.notFound")}</Title>
          </EmptyState>
        </Main>
        <Footer />
      </Page>
    );
  }

  if (!post) {
    return (
      <Page>
        <Header />
        <Main />
        <Footer />
      </Page>
    );
  }

  const postImageUrl = post.imagemCapa
    ? post.imagemCapa.startsWith("http")
      ? post.imagemCapa
      : `https://amaisindicada.com.br${post.imagemCapa}`
    : undefined;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    description: post.resumo,
    image: postImageUrl,
    datePublished: post.publicadoEm,
    author: { "@type": "Organization", name: post.autor || "A Mais Indicada" },
    publisher: { "@type": "Organization", name: "A Mais Indicada" },
  };

  return (
    <Page>
      <Seo title={`${post.titulo} | A Mais Indicada`} description={post.resumo} jsonLd={articleJsonLd} />
      <Header />
      <Main>
        <BackLink to={lp("/blog")}>
          <FiArrowLeft /> {t("postDetalhe.back")}
        </BackLink>
        {post.imagemCapa ? <CoverImage src={post.imagemCapa} alt={post.titulo} /> : null}
        <Eyebrow>
          {post.autor || t("postDetalhe.fallbackAuthor")} {post.publicadoEm ? `- ${formatDate(post.publicadoEm, locale)}` : ""}
        </Eyebrow>
        <Title>{post.titulo}</Title>
        <Content>
          <ReactMarkdown>{post.conteudoMarkdown}</ReactMarkdown>
        </Content>
      </Main>
      <Footer />
    </Page>
  );
}

export default PostDetalhe;
