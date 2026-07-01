const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const normalizarImagem = (post) => ({
  ...post,
  imagemCapa:
    post.imagemCapa && post.imagemCapa.startsWith("/")
      ? `${process.env.PUBLIC_URL || ""}${post.imagemCapa}`
      : post.imagemCapa,
});

const request = async (path, options = {}) => {
  const { token, headers, ...requestOptions } = options;
  const response = await fetch(`${apiBase}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...requestOptions,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Falha ao comunicar com a API.");
  }

  return data;
};

export const listarPosts = async () => {
  try {
    const posts = await request("/posts");
    return posts.map(normalizarImagem);
  } catch (error) {
    return [];
  }
};

export const buscarPost = async (id) => {
  try {
    return normalizarImagem(await request(`/posts/${id}`));
  } catch (error) {
    return null;
  }
};

export const listarPostsAdmin = async (token) => {
  const posts = await request("/admin/posts", { token });
  return posts.map(normalizarImagem);
};

export const criarPost = (post, token) =>
  request("/admin/posts", {
    method: "POST",
    token,
    body: JSON.stringify(post),
  });

export const atualizarPost = (id, post, token) =>
  request(`/admin/posts/${id}`, {
    method: "PUT",
    token,
    body: JSON.stringify(post),
  });

export const removerPost = (id, token) =>
  request(`/admin/posts/${id}`, {
    method: "DELETE",
    token,
  });
