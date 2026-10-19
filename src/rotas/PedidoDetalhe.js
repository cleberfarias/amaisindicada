import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { FiArrowLeft, FiPackage } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { buscarPedido, solicitarCancelamento, solicitarDevolucao } from "../services/checkoutApi";
import { theme } from "../styles/theme";

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(920px, calc(100% - 32px));
  margin: 0 auto;
  padding: 72px 0;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  color: ${theme.colors.tealDark};
  font-weight: 800;
  text-decoration: none;
`;

const Title = styled.h1`
  margin: 12px 0 20px;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.3rem, 5vw, 4.4rem);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.line};

  &:last-child {
    border-bottom: 0;
  }
`;

const Button = styled.button`
  min-height: 42px;
  border: 1px solid ${theme.colors.teal};
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.teal};
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }
`;

const TextArea = styled.textarea`
  min-height: 86px;
  resize: vertical;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const Notice = styled.div`
  padding: 14px;
  border-radius: 8px;
  color: ${({ $error }) => ($error ? "#8a2e1f" : theme.colors.brownSoft)};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.line};
  font-weight: ${({ $error }) => ($error ? 800 : 500)};
`;

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function PedidoDetalhe() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [pedido, setPedido] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const canCancel = useMemo(
    () => pedido && !["enviado", "entregue", "cancelado", "reembolsado", "devolucao_solicitada"].includes(pedido.status),
    [pedido]
  );
  const canReturn = useMemo(() => pedido && ["enviado", "entregue"].includes(pedido.status), [pedido]);

  useEffect(() => {
    buscarPedido(id, token)
      .then(setPedido)
      .catch((loadError) => setError(loadError.message));
  }, [id, token]);

  const requestCancel = async () => {
    setStatus("");
    setError("");
    try {
      const updated = await solicitarCancelamento(id, token, motivo);
      setPedido(updated);
      setStatus(t("orderDetail.cancelRegistered"));
    } catch (cancelError) {
      setError(cancelError.message);
    }
  };

  const requestReturn = async () => {
    setStatus("");
    setError("");
    try {
      const updated = await solicitarDevolucao(id, token, motivo);
      setPedido(updated);
      setStatus(t("orderDetail.returnRegistered"));
    } catch (returnError) {
      setError(returnError.message);
    }
  };

  return (
    <Page>
      <Seo noindex title={t("orderDetail.seoTitle")} />
      <Header />
      <Main>
        <BackLink to="/meus-pedidos">
          <FiArrowLeft /> {t("orderDetail.back")}
        </BackLink>
        <Eyebrow>
          <FiPackage /> {t("orderDetail.eyebrow")}
        </Eyebrow>
        <Title>{pedido ? t("orderDetail.orderNumber", { id: pedido.id.slice(0, 8) }) : t("orderDetail.titleFallback")}</Title>

        {error ? <Notice $error>{error}</Notice> : null}
        {status ? <Notice>{status}</Notice> : null}

        {pedido ? (
          <Grid>
            <Panel>
              <h2>{t("orderDetail.status", { status: pedido.status })}</h2>
              {pedido.rastreio ? <strong>{t("orderDetail.tracking", { code: pedido.rastreio })}</strong> : null}
              {pedido.items?.map((item) => (
                <Row key={item.id}>
                  <span>{item.quantidade}x {item.nome}</span>
                  <strong>{formatPrice(item.preco * item.quantidade)}</strong>
                </Row>
              ))}
              <Row>
                <span>{t("loja.subtotalLabel")}</span>
                <strong>{formatPrice(pedido.subtotal)}</strong>
              </Row>
              <Row>
                <span>{pedido.frete?.nome || t("loja.shipping.label")}</span>
                <strong>{formatPrice(pedido.frete?.valor)}</strong>
              </Row>
              <Row>
                <span>{t("loja.totalLabel")}</span>
                <strong>{formatPrice(pedido.total)}</strong>
              </Row>
            </Panel>

            <Panel>
              <h2>{t("orderDetail.supportTitle")}</h2>
              <TextArea value={motivo} onChange={(event) => setMotivo(event.target.value)} placeholder={t("orderDetail.reasonPlaceholder")} />
              {canCancel ? <Button type="button" onClick={requestCancel}>{t("orderDetail.requestCancel")}</Button> : null}
              {canReturn ? <Button type="button" onClick={requestReturn}>{t("orderDetail.requestReturn")}</Button> : null}
              {!canCancel && !canReturn ? <Notice>{t("orderDetail.noAction")}</Notice> : null}
            </Panel>
          </Grid>
        ) : !error ? (
          <Notice>{t("orderDetail.loading")}</Notice>
        ) : null}
      </Main>
      <Footer />
    </Page>
  );
}

export default PedidoDetalhe;
