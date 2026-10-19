import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FiRefreshCw, FiSave, FiShoppingBag } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import AdminShell from "../componentes/AdminShell/AdminShell";
import AdminAuthGate from "../componentes/AdminShell/AdminAuthGate";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { atualizarPedidoAdmin, listarPedidosAdmin } from "../services/checkoutApi";
import { theme } from "../styles/theme";

const statusOptions = [
  "aguardando_pagamento",
  "pago",
  "em_separacao",
  "enviado",
  "entregue",
  "cancelamento_solicitado",
  "cancelado",
  "devolucao_solicitada",
  "reembolsado",
];

const paymentOptions = ["pendente", "aprovado", "recusado", "estornado"];

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

const Title = styled.h1`
  max-width: 820px;
  margin: 12px 0 20px;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.tealDark};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Toolbar = styled.div`
  margin-bottom: 16px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${theme.colors.teal};
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.teal};
  font-weight: 800;
  cursor: pointer;
`;

const List = styled.div`
  display: grid;
  gap: 14px;
`;

const Card = styled.article`
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;

  h2 {
    margin: 0;
    font-family: ${theme.fonts.heading};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  font-weight: 800;
`;

const Input = styled.input`
  min-height: 40px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 10px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const Select = styled.select`
  min-height: 40px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 10px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const Notice = styled.div`
  color: ${({ $error }) => ($error ? "#8a2e1f" : theme.colors.tealDark)};
  font-weight: 800;
`;

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function AdminPedidos() {
  const { t } = useTranslation();
  const { token } = useAdminAuth();
  const [pedidos, setPedidos] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    if (!token) {
      setPedidos([]);
      return;
    }
    try {
      const result = await listarPedidosAdmin(token);
      setPedidos(result);
      setDrafts(
        result.reduce((acc, pedido) => {
          acc[pedido.id] = {
            status: pedido.status,
            pagamentoStatus: pedido.pagamento?.status || "pendente",
            pagamentoMetodo: pedido.pagamento?.metodo || "pix",
            rastreio: pedido.rastreio || "",
            nota: "",
          };
          return acc;
        }, {})
      );
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const updateDraft = (id, field, value) => {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], [field]: value } }));
  };

  const saveOrder = async (id) => {
    setStatus("");
    setError("");
    try {
      await atualizarPedidoAdmin(id, drafts[id], token);
      setStatus(t("adminOrders.updated"));
      await loadOrders();
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  return (
    <Page>
      <Seo noindex title={t("adminOrders.seoTitle")} />
      <Header />
      <Main>
        <Eyebrow>
          <FiShoppingBag /> {t("adminOrders.eyebrow")}
        </Eyebrow>
        <Title>{t("adminOrders.title")}</Title>
        <AdminAuthGate>
          <AdminShell />
          <Toolbar>
            <Button type="button" onClick={loadOrders}>
              <FiRefreshCw /> {t("adminOrders.refresh")}
            </Button>
          </Toolbar>
          {status ? <Notice>{status}</Notice> : null}
          {error ? <Notice $error>{error}</Notice> : null}
          <List>
            {pedidos.map((pedido) => (
              <Card key={pedido.id}>
                <HeaderRow>
                  <div>
                    <h2>{t("ordersList.orderNumber", { id: pedido.id.slice(0, 8) })}</h2>
                    <p>{pedido.cliente?.nome} - {pedido.cliente?.email} - {pedido.cliente?.telefone}</p>
                  </div>
                  <strong>{formatPrice(pedido.total)}</strong>
                </HeaderRow>
                <p>
                  {pedido.items?.map((item) => `${item.quantidade}x ${item.nome}`).join(", ")}
                </p>
                <Grid>
                  <Field>
                    {t("adminOrders.status")}
                    <Select value={drafts[pedido.id]?.status || pedido.status} onChange={(event) => updateDraft(pedido.id, "status", event.target.value)}>
                      {statusOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </Select>
                  </Field>
                  <Field>
                    {t("adminOrders.payment")}
                    <Select value={drafts[pedido.id]?.pagamentoStatus || "pendente"} onChange={(event) => updateDraft(pedido.id, "pagamentoStatus", event.target.value)}>
                      {paymentOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </Select>
                  </Field>
                  <Field>
                    {t("adminOrders.method")}
                    <Input value={drafts[pedido.id]?.pagamentoMetodo || ""} onChange={(event) => updateDraft(pedido.id, "pagamentoMetodo", event.target.value)} />
                  </Field>
                  <Field>
                    {t("adminOrders.tracking")}
                    <Input value={drafts[pedido.id]?.rastreio || ""} onChange={(event) => updateDraft(pedido.id, "rastreio", event.target.value)} />
                  </Field>
                </Grid>
                <Field>
                  {t("adminOrders.internalNote")}
                  <Input value={drafts[pedido.id]?.nota || ""} onChange={(event) => updateDraft(pedido.id, "nota", event.target.value)} />
                </Field>
                <Button type="button" onClick={() => saveOrder(pedido.id)}>
                  <FiSave /> {t("adminOrders.save")}
                </Button>
              </Card>
            ))}
          </List>
        </AdminAuthGate>
      </Main>
      <Footer />
    </Page>
  );
}

export default AdminPedidos;
