const apiBase = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const localizedFields = ["titulo", "resumo", "conteudoMarkdown"];

const getLocalizedPost = (post, lang = "pt") => {
  if (!post || lang === "pt") {
    return post;
  }

  const translation = post.translations?.[lang] || {};
  const localized = { ...post };

  localizedFields.forEach((field) => {
    if (translation[field]) {
      localized[field] = translation[field];
    }
  });

  return localized;
};

const normalizarPost = (post, lang) => {
  const localized = getLocalizedPost(post, lang);

  return {
    ...localized,
    imagemCapa:
      localized.imagemCapa && localized.imagemCapa.startsWith("/")
        ? `${process.env.PUBLIC_URL || ""}${localized.imagemCapa}`
        : localized.imagemCapa,
  };
};

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

export const listarPosts = async (lang = "pt") => {
  try {
    const posts = await request("/posts");
    return posts.map((post) => normalizarPost(post, lang));
  } catch (error) {
    return [];
  }
};

export const buscarPost = async (id, lang = "pt") => {
  try {
    return normalizarPost(await request(`/posts/${id}`), lang);
  } catch (error) {
    return null;
  }
};

export const listarPostsAdmin = async (token) => {
  const posts = await request("/admin/posts", { token });
  return posts.map((post) => normalizarPost(post, "pt"));
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
