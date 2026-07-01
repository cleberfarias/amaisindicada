import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiEdit3 } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import { listarPosts } from "../services/blogApi";
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
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 78px 0;
`;

const Hero = styled.header`
  margin-bottom: 34px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  display: grid;
  grid-template-rows: 200px auto;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const ImageWrap = styled.div`
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, ${theme.colors.white}, ${theme.colors.cream});

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: ${theme.colors.teal};

  svg {
    width: 40px;
    height: 40px;
  }
`;

const CardBody = styled.div`
  display: grid;
  gap: 10px;
  padding: 20px;
`;

const PostMeta = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PostTitle = styled.h2`
  margin: 0;
  font-family: ${theme.fonts.heading};
  font-size: 1.45rem;
  line-height: 1.05;
`;

const PostText = styled.p`
  margin: 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.55;
`;

const ReadLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  color: ${theme.colors.tealDark};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.teal};
  }
`;

const EmptyState = styled.div`
  padding: 40px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.brownSoft};
`;

const formatDate = (value, locale) => {
  try {
    return new Date(value).toLocaleDateString(locale);
  } catch (error) {
    return "";
  }
};

function Blog() {
  const { t, i18n } = useTranslation();
  const lp = useLocalizedPath();
  const [posts, setPosts] = useState([]);
  const locale = dateLocale[i18n.language] || dateLocale.pt;
  const fallbackAuthor = t("blog.fallbackAuthor");

  useEffect(() => {
    listarPosts().then(setPosts);
  }, []);

  return (
    <Page>
      <Header />
      <Main>
        <Hero>
          <Eyebrow><FiEdit3 /> {t("blog.hero.eyebrow")}</Eyebrow>
          <Title>{t("blog.hero.title")}</Title>
          <Lead>{t("blog.hero.lead")}</Lead>
        </Hero>

        {posts.length ? (
          <Grid>
            {posts.map((post) => (
              <Card key={post.id}>
                <ImageWrap>
                  {post.imagemCapa ? (
                    <img src={post.imagemCapa} alt={post.titulo} />
                  ) : (
                    <ImagePlaceholder><FiEdit3 /></ImagePlaceholder>
                  )}
                </ImageWrap>
                <CardBody>
                  <PostMeta>
                    {post.autor || fallbackAuthor} {post.publicadoEm ? `- ${formatDate(post.publicadoEm, locale)}` : ""}
                  </PostMeta>
                  <PostTitle>{post.titulo}</PostTitle>
                  <PostText>{post.resumo}</PostText>
                  <ReadLink to={lp(`/blog/${post.id}`)}>
                    {t("blog.readMore")} <FiArrowRight />
                  </ReadLink>
                </CardBody>
              </Card>
            ))}
          </Grid>
        ) : (
          <EmptyState>{t("blog.empty")}</EmptyState>
        )}
      </Main>
      <Footer />
    </Page>
  );
}

export default Blog;
