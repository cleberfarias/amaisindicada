import React, { useState } from "react";
import styled from "styled-components";
import { FiLock, FiLogOut } from "react-icons/fi";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { theme } from "../../styles/theme";

const GateWrap = styled.div`
  display: grid;
  place-items: center;
  min-height: 60vh;
  padding: 40px 16px;
`;

const GateCard = styled.div`
  width: min(360px, 100%);
  padding: 32px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.line};
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const GateTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 8px;
  font-family: ${theme.fonts.heading};
  font-size: 1.8rem;
  color: ${theme.colors.brown};
`;

const GateLead = styled.p`
  margin: 0 0 22px;
  color: ${theme.colors.brownSoft};
  line-height: 1.6;
`;

const Field = styled.label`
  display: grid;
  gap: 7px;
  margin-bottom: 16px;
  color: ${theme.colors.brown};
  font-weight: 800;
`;

const Input = styled.input`
  min-height: 44px;
  width: 100%;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  outline-color: ${theme.colors.teal};
`;

const SubmitButton = styled.button`
  width: 100%;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.teal};
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;

const ErrorBox = styled.div`
  margin-top: 14px;
  color: #8a2e1f;
  font-weight: 800;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 18px;
  color: ${theme.colors.brownSoft};
  font-size: 0.9rem;
`;

const LogoutButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid ${theme.colors.line};
  border-radius: 999px;
  color: ${theme.colors.brown};
  background: ${theme.colors.white};
  font-weight: 800;
  cursor: pointer;
`;

function AdminAuthGate({ children }) {
  const { isAuthenticated, checking, username, login, logout } = useAdminAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.username, form.password);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (checking) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <GateWrap>
        <GateCard>
          <GateTitle><FiLock /> Area administrativa</GateTitle>
          <GateLead>Entre com seu usuario e senha para gerenciar produtos, marketing e blog.</GateLead>
          <form onSubmit={handleSubmit}>
            <Field>
              Usuario
              <Input
                value={form.username}
                onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                autoComplete="username"
              />
            </Field>
            <Field>
              Senha
              <Input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                autoComplete="current-password"
              />
            </Field>
            <SubmitButton type="submit" disabled={submitting}>
              {submitting ? "Entrando..." : "Entrar"}
            </SubmitButton>
          </form>
          {error ? <ErrorBox>{error}</ErrorBox> : null}
        </GateCard>
      </GateWrap>
    );
  }

  return (
    <>
      <StatusBar>
        Logado como <strong>{username}</strong>
        <LogoutButton type="button" onClick={logout}>
          <FiLogOut /> Sair
        </LogoutButton>
      </StatusBar>
      {children}
    </>
  );
}

export default AdminAuthGate;
