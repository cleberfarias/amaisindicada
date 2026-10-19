const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const request = async (path, options = {}) => {
  let response;

  try {
    response = await fetch(`${apiBase}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (error) {
    throw new Error("Nao foi possivel acessar a API da loja. Verifique se o servidor esta rodando e se o dominio esta liberado no CORS.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Falha ao comunicar com a API.");
  }

  return data;
};

export const calcularFrete = ({ cepDestino, items }) =>
  request("/checkout/frete", {
    method: "POST",
    body: JSON.stringify({ cepDestino, items }),
  });

export const criarPedido = (payload) =>
  request("/pedidos", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const buscarPedido = (id, token) =>
  request(`/pedidos/${id}?token=${encodeURIComponent(token)}`);

export const solicitarCancelamento = (id, token, motivo) =>
  request(`/pedidos/${id}/cancelamento`, {
    method: "POST",
    body: JSON.stringify({ token, motivo }),
  });

export const solicitarDevolucao = (id, token, motivo) =>
  request(`/pedidos/${id}/devolucao`, {
    method: "POST",
    body: JSON.stringify({ token, motivo }),
  });

export const listarPedidosAdmin = (token) =>
  request("/admin/pedidos", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const atualizarPedidoAdmin = (id, payload, token) =>
  request(`/admin/pedidos/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });
