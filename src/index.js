import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useTranslation } from "react-i18next";

import "./i18n/config";
import Home from "./rotas/Home";
import Institucional from "./rotas/Institucional";
import FaleConosco from "./rotas/FaleConosco";
import Catalogo from "./rotas/Catalogo";
import Exportacao from "./rotas/Exportacao";
import ProdutoDetalhe from "./rotas/ProdutoDetalhe";
import Blog from "./rotas/Blog";
import PostDetalhe from "./rotas/PostDetalhe";
import AdminHome from "./rotas/AdminHome";
import AdminProdutos from "./rotas/AdminProdutos";
import AdminMarketing from "./rotas/AdminMarketing";
import AdminBlog from "./rotas/AdminBlog";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import { LocaleLayout } from "./contexts/LocaleContext";
import { theme } from "./styles/theme";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background-color: ${theme.colors.cream};
    color: ${theme.colors.brown};
    font-family: ${theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  img {
    max-width: 100%;
  }
`;

const ModalBackdrop = {
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 16,
  background: "rgba(48, 38, 29, 0.92)",
};

const ModalBox = {
  width: "min(420px, 100%)",
  padding: 32,
  borderRadius: 8,
  textAlign: "center",
  background: theme.colors.cream,
  boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
};

const ModalButton = {
  minHeight: 42,
  padding: "0 18px",
  border: 0,
  borderRadius: 999,
  color: theme.colors.white,
  background: theme.colors.teal,
  fontWeight: 800,
  cursor: "pointer",
};

const SecondaryModalButton = {
  ...ModalButton,
  color: theme.colors.brown,
  background: theme.colors.white,
  border: `1px solid ${theme.colors.line}`,
};

const AgeVerificationModal = ({ onConfirm }) => {
  const { t } = useTranslation();

  return (
    <div style={ModalBackdrop}>
      <div style={ModalBox}>
        <h2 style={{ margin: "0 0 12px", color: theme.colors.brown, fontFamily: theme.fonts.heading }}>
          {t("ageGate.title")}
        </h2>
        <p style={{ margin: "0 0 24px", color: theme.colors.brownSoft, lineHeight: 1.6 }}>
          {t("ageGate.text")}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <button type="button" onClick={() => onConfirm(true)} style={ModalButton}>
            {t("ageGate.yes")}
          </button>
          <button type="button" onClick={() => onConfirm(false)} style={SecondaryModalButton}>
            {t("ageGate.no")}
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { t } = useTranslation();
  const [ageVerified, setAgeVerified] = useState(null);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified) {
      setAgeVerified(true);
    }
  }, []);

  const handleAgeVerification = (isVerified) => {
    if (isVerified) {
      localStorage.setItem("ageVerified", "true");
      setAgeVerified(true);
      return;
    }

    alert(t("ageGate.alert"));
    window.location.href = "https://www.google.com";
  };

  if (!ageVerified) {
    return <AgeVerificationModal onConfirm={handleAgeVerification} />;
  }

  const paginasPublicas = (
    <>
      <Route index element={<Home />} />
      <Route path="institucional" element={<Institucional />} />
      <Route path="catalogo" element={<Catalogo />} />
      <Route path="produto/:id" element={<ProdutoDetalhe />} />
      <Route path="exportacao" element={<Exportacao />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:slug" element={<PostDetalhe />} />
      <Route path="contato" element={<FaleConosco />} />
    </>
  );

  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<LocaleLayout lang="pt" />}>
            {paginasPublicas}
          </Route>
          <Route path="/en" element={<LocaleLayout lang="en" />}>
            {paginasPublicas}
          </Route>
          <Route path="/es" element={<LocaleLayout lang="es" />}>
            {paginasPublicas}
          </Route>
          <Route path="/catálogo" element={<Catalogo />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/produtos" element={<AdminProdutos />} />
          <Route path="/admin/marketing" element={<AdminMarketing />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/cadastro" element={<Navigate to="/contato" replace />} />
          <Route path="/confirmarcadastro" element={<Navigate to="/contato" replace />} />
          <Route path="/login" element={<Navigate to="/contato" replace />} />
          <Route path="/confirmcadastrosenha" element={<Navigate to="/contato" replace />} />
          <Route path="/carrinho" element={<Navigate to="/catalogo" replace />} />
          <Route path="/fechamentocompra" element={<Navigate to="/contato" replace />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);

if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
  window.location.href = `https://${window.location.host}${window.location.pathname}${window.location.search}`;
}

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
