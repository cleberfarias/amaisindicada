const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${apiBase}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Falha ao comunicar com a API.");
  }

  return data;
};

export const login = (username, password) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

export const logout = (token) =>
  request("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

export const verificarSessao = (token) =>
  request("/auth/session", {
    headers: { Authorization: `Bearer ${token}` },
  });
