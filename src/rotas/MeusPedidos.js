import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FiPackage } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { buscarPedido } from "../services/checkoutApi";
import { theme } from "../styles/theme";

const ORDERS_KEY = "amaisindicadaOrders";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(920px, calc(100% - 32px));
  margin: 0 auto;
  padding: 78px 0;
`;

const Title = styled.h1`
  margin: 12px 0 24px;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.5rem, 6vw, 4.8rem);
  line-height: 0.95;
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

const List = styled.div`
  display: grid;
  gap: 12px;
`;

const Card = styled(Link)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  padding: 18px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  text-decoration: none;

  strong {
    display: block;
    font-family: ${theme.fonts.heading};
    font-size: 1.3rem;
  }

  span {
    color: ${theme.colors.brownSoft};
  }
`;

const EmptyState = styled.div`
  padding: 32px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.brownSoft};
`;

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const readOrders = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
};

function MeusPedidos() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const accessList = readOrders();
    Promise.all(
      accessList.map((item) =>
        buscarPedido(item.id, item.accessToken)
          .then((pedido) => ({ ...pedido, accessToken: item.accessToken }))
          .catch(() => null)
      )
    ).then((results) => {
      setOrders(results.filter(Boolean));
      setLoaded(true);
    });
  }, []);

  return (
    <Page>
      <Seo noindex title={t("ordersList.seoTitle")} />
      <Header />
      <Main>
        <Eyebrow>
          <FiPackage /> {t("ordersList.eyebrow")}
        </Eyebrow>
        <Title>{t("ordersList.title")}</Title>
        {orders.length ? (
          <List>
            {orders.map((pedido) => (
              <Card key={pedido.id} to={`/pedido/${pedido.id}?token=${pedido.accessToken}`}>
                <div>
                  <strong>{t("ordersList.orderNumber", { id: pedido.id.slice(0, 8) })}</strong>
                  <span>{t("ordersList.orderSummary", { status: pedido.status, count: pedido.items?.length || 0 })}</span>
                </div>
                <strong>{formatPrice(pedido.total)}</strong>
              </Card>
            ))}
          </List>
        ) : (
          <EmptyState>
            {loaded ? t("ordersList.empty") : t("ordersList.loading")}
          </EmptyState>
        )}
      </Main>
      <Footer />
    </Page>
  );
}

export default MeusPedidos;
