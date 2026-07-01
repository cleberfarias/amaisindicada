import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiEdit3, FiEye, FiPlus, FiRefreshCw, FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import AdminShell from "../componentes/AdminShell/AdminShell";
import AdminAuthGate from "../componentes/AdminShell/AdminAuthGate";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import { enviarImagemProduto } from "../services/produtosApi";
import { atualizarPost, criarPost, listarPostsAdmin, removerPost } from "../services/blogApi";
import { theme } from "../styles/theme";

const emptyForm = {
  id: "",
  titulo: "",
  resumo: "",
  conteudoMarkdown: "",
  imagemCapa: "",
  autor: "",
  tags: "",
  status: "rascunho",
  ordem: 0,
  ativo: true,
};

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

const HeaderGrid = styled.header`
  margin-bottom: 24px;
`;

const Eyebrow = styled.span`
  color: ${theme.colors.tealDark};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  max-width: 820px;
  margin: 12px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 720px;
  color: ${theme.colors.brownSoft};
  line-height: 1.75;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(340px, 1fr) minmax(360px, 0.9fr);
  gap: 22px;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const PanelBody = styled.div`
  padding: 22px;
`;

const Form = styled.form`
  display: grid;
  gap: 18px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.label`
  display: grid;
  gap: 7px;
  color: ${theme.colors.brown};
  font-weight: 800;
`;

const FullField = styled(Field)`
  grid-column: 1 / -1;
`;

const fieldStyles = `
  min-height: 44px;
  width: 100%;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  outline-color: ${theme.colors.teal};
`;

const Input = styled.input`
  ${fieldStyles}
`;

const Select = styled.select`
  ${fieldStyles}
`;

const TextArea = styled.textarea`
  min-height: 96px;
  resize: vertical;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  outline-color: ${theme.colors.teal};
`;

const ContentArea = styled(TextArea)`
  min-height: 220px;
  font-family: monospace;
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  font-weight: 800;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid ${({ $variant }) => ($variant === "ghost" ? theme.colors.line : theme.colors.teal)};
  border-radius: 999px;
  color: ${({ $variant }) => ($variant === "ghost" ? theme.colors.brown : theme.colors.white)};
  background: ${({ $variant }) => ($variant === "ghost" ? theme.colors.white : theme.colors.teal)};
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
`;

const UploadRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const PostList = styled.div`
  display: grid;
  gap: 12px;
  padding: 18px;
`;

const PostItem = styled.article`
  display: grid;
  gap: 6px;
  padding: 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};

  strong {
    display: block;
    font-family: ${theme.fonts.heading};
    font-size: 1.25rem;
    line-height: 1;
  }

  span {
    display: block;
    margin-top: 5px;
    color: ${theme.colors.brownSoft};
    font-size: 0.92rem;
  }
`;

const StatusTag = styled.span`
  display: inline-flex;
  width: fit-content;
  margin-top: 8px;
  padding: 5px 9px;
  border-radius: 999px;
  color: ${theme.colors.white} !important;
  background: ${({ $status }) => ($status === "publicado" ? theme.colors.teal : theme.colors.brown)};
  font-size: 0.74rem !important;
  font-weight: 800;
`;

const Status = styled.div`
  margin: 14px 0 0;
  color: ${theme.colors.tealDark};
  font-weight: 800;
`;

const ErrorBox = styled.div`
  margin-top: 14px;
  color: #8a2e1f;
  font-weight: 800;
`;

function AdminBlog() {
  const { token } = useAdminAuth();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const isEditing = Boolean(editingId);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.ordem || 0) - (b.ordem || 0) || a.titulo.localeCompare(b.titulo)),
    [posts]
  );

  const loadPosts = useCallback(async () => {
    if (!token) {
      setPosts([]);
      return;
    }

    try {
      setPosts(await listarPostsAdmin(token));
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [token]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");

    try {
      if (isEditing) {
        await atualizarPost(editingId, form, token);
        setStatus("Artigo atualizado.");
      } else {
        await criarPost(form, token);
        setStatus("Artigo cadastrado.");
      }

      resetForm();
      await loadPosts();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const editPost = (post) => {
    setEditingId(post.id);
    setForm({
      ...emptyForm,
      ...post,
      imagemCapa: (post.imagemCapa || "").replace(process.env.PUBLIC_URL || "", ""),
      tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
      status: post.status || "rascunho",
      ativo: post.ativo !== false,
    });
    setStatus("");
    setError("");
  };

  const deletePost = async (post) => {
    const confirmed = window.confirm(`Remover o artigo "${post.titulo}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await removerPost(post.id, token);
      setStatus("Artigo removido.");
      await loadPosts();
      if (editingId === post.id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const uploadImage = async (event) => {
    const arquivo = event.target.files?.[0];
    if (!arquivo) {
      return;
    }

    setStatus("");
    setError("");
    setUploading(true);

    try {
      const upload = await enviarImagemProduto(arquivo, token);
      updateForm("imagemCapa", upload.caminho);
      setStatus("Imagem enviada. Agora salve o artigo.");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <Page>
      <Header />
      <Main>
        <HeaderGrid>
          <Eyebrow>Administrativo</Eyebrow>
          <Title>Blog para contar a historia da marca.</Title>
          <Lead>Escreva, publique e organize artigos com conteudo em Markdown.</Lead>
        </HeaderGrid>

        <AdminAuthGate>
        <AdminShell />

        <Layout>
          <Panel>
            <PanelBody>
              <Form onSubmit={handleSubmit}>
                <FormGrid>
                  <FullField>
                    Titulo
                    <Input value={form.titulo} onChange={(event) => updateForm("titulo", event.target.value)} />
                  </FullField>

                  <FullField>
                    Resumo
                    <TextArea value={form.resumo} onChange={(event) => updateForm("resumo", event.target.value)} />
                  </FullField>

                  <FullField>
                    Conteudo (Markdown)
                    <ContentArea
                      value={form.conteudoMarkdown}
                      onChange={(event) => updateForm("conteudoMarkdown", event.target.value)}
                      placeholder="Titulos com #, negrito com **texto**, links com [texto](url)."
                    />
                  </FullField>

                  <FullField>
                    Imagem de capa
                    <UploadRow>
                      <Input
                        value={form.imagemCapa}
                        onChange={(event) => updateForm("imagemCapa", event.target.value)}
                        placeholder="/produtos/uploads/capa.webp"
                      />
                      <Button as="label" type="button" $variant="ghost">
                        <FiUpload /> {uploading ? "Enviando" : "Enviar imagem"}
                        <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={uploadImage} />
                      </Button>
                    </UploadRow>
                  </FullField>

                  <Field>
                    Autor
                    <Input value={form.autor} onChange={(event) => updateForm("autor", event.target.value)} />
                  </Field>

                  <Field>
                    Tags (separadas por virgula)
                    <Input value={form.tags} onChange={(event) => updateForm("tags", event.target.value)} />
                  </Field>

                  <Field>
                    Status
                    <Select value={form.status} onChange={(event) => updateForm("status", event.target.value)}>
                      <option value="publicado">Publicado</option>
                      <option value="rascunho">Rascunho</option>
                    </Select>
                  </Field>

                  <Field>
                    Ordem
                    <Input
                      type="number"
                      value={form.ordem}
                      onChange={(event) => updateForm("ordem", event.target.value)}
                    />
                  </Field>

                  <FullField>
                    <CheckRow>
                      <input
                        type="checkbox"
                        checked={form.ativo}
                        onChange={(event) => updateForm("ativo", event.target.checked)}
                      />
                      Artigo ativo
                    </CheckRow>
                  </FullField>
                </FormGrid>

                <Actions>
                  <Button type="submit">
                    <FiSave /> {isEditing ? "Salvar alteracoes" : "Cadastrar artigo"}
                  </Button>
                  <Button type="button" $variant="ghost" onClick={resetForm}>
                    <FiPlus /> Novo
                  </Button>
                </Actions>
              </Form>

              {status ? <Status>{status}</Status> : null}
              {error ? <ErrorBox>{error}</ErrorBox> : null}
            </PanelBody>
          </Panel>

          <Panel>
            <PanelBody>
              <Actions>
                <Button type="button" $variant="ghost" onClick={loadPosts}>
                  <FiRefreshCw /> Atualizar lista
                </Button>
              </Actions>
            </PanelBody>

            <PostList>
              {sortedPosts.map((post) => (
                <PostItem key={post.id}>
                  <strong>{post.titulo}</strong>
                  <span>{post.autor || "A Mais Indicada"} - ordem {post.ordem || 0}</span>
                  <StatusTag $status={post.status || "rascunho"}>{post.status || "rascunho"}</StatusTag>
                  <Actions style={{ marginTop: 12 }}>
                    <Button type="button" $variant="ghost" onClick={() => editPost(post)}>
                      <FiEdit3 /> Editar
                    </Button>
                    <Button as="a" href={`/blog/${post.id}`} target="_blank" rel="noreferrer" $variant="ghost">
                      <FiEye /> Ver
                    </Button>
                    <Button type="button" $variant="ghost" onClick={() => deletePost(post)}>
                      <FiTrash2 /> Remover
                    </Button>
                  </Actions>
                </PostItem>
              ))}
            </PostList>
          </Panel>
        </Layout>
        </AdminAuthGate>
      </Main>
      <Footer />
    </Page>
  );
}

export default AdminBlog;
