import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest, logout as logoutRequest, verificarSessao } from "../services/authApi";

const STORAGE_KEY = "adminSession";
const AdminAuthContext = createContext(null);

const readStoredSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const session = JSON.parse(raw);
    if (!session.token || !session.expiresAt || session.expiresAt < Date.now()) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return session;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!session) {
      setChecking(false);
      return;
    }

    verificarSessao(session.token)
      .then(() => setChecking(false))
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        setSession(null);
        setChecking(false);
      });
  }, [session]);

  const login = useCallback(async (username, password) => {
    const result = await loginRequest(username, password);
    const next = { token: result.token, username: result.username, expiresAt: result.expiresAt };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
    return next;
  }, []);

  const logout = useCallback(async () => {
    if (session) {
      await logoutRequest(session.token).catch(() => {});
    }
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, [session]);

  const value = useMemo(
    () => ({
      token: session?.token || "",
      username: session?.username || "",
      isAuthenticated: Boolean(session),
      checking,
      login,
      logout,
    }),
    [session, checking, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth precisa ser usado dentro de AdminAuthProvider.");
  }
  return context;
};
