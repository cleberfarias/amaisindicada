import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiEdit3, FiEye, FiPlus, FiRefreshCw, FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import AdminShell from "../componentes/AdminShell/AdminShell";
import AdminAuthGate from "../componentes/AdminShell/AdminAuthGate";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import {
  atualizarProduto,
  criarProduto,
  enviarImagemProduto,
  listarProdutos,
  listarProdutosAdmin,
  removerProduto,
} from "../services/produtosApi";
import { theme } from "../styles/theme";

const emptyForm = {
  id: "",
  nome: "",
  linha: "",
  perfil: "",
  descricaoLonga: "",
  imagem: "",
  volume: "",
  teorAlcoolico: "",
  ingredientes: "",
  embalagem: "",
  status: "publicado",
  ordem: 0,
  destaque: false,
  exibirHome: false,
  exibirCatalogo: true,
  exibirExportacao: false,
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
  display: grid;
  grid-template-columns: 1fr minmax(260px, 360px);
  gap: 24px;
  align-items: end;
  margin-bottom: 24px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
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

const Help = styled.span`
  color: ${theme.colors.brownSoft};
  font-size: 0.82rem;
  font-weight: 500;
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

const CheckGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
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

const ProductList = styled.div`
  display: grid;
  gap: 12px;
  padding: 18px;
`;

const ProductItem = styled.article`
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
  align-items: center;
  padding: 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};
`;

const ProductImage = styled.img`
  width: 64px;
  height: 82px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  min-width: 0;

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

const Preview = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 18px;
  padding: 18px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};

  img {
    width: min(160px, 100%);
    max-height: 220px;
    object-fit: contain;
  }

  h3 {
    margin: 0;
    font-family: ${theme.fonts.heading};
    font-size: 1.7rem;
    line-height: 1;
  }

  p {
    margin: 0;
    color: ${theme.colors.brownSoft};
    line-height: 1.6;
  }
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

function AdminProdutos() {
  const { token } = useAdminAuth();
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const isEditing = Boolean(editingId);

  const sortedProducts = useMemo(
    () => [...produtos].sort((a, b) => (a.ordem || 0) - (b.ordem || 0) || a.nome.localeCompare(b.nome)),
    [produtos]
  );

  const loadProducts = useCallback(async () => {
    try {
      setProdutos(token ? await listarProdutosAdmin(token) : await listarProdutos());
    } catch (loadError) {
      setError(loadError.message);
      setProdutos(await listarProdutos());
    }
  }, [token]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateForm = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === "exibirHome") {
        next.destaque = value;
      }
      if (field === "destaque") {
        next.exibirHome = value;
      }
      return next;
    });
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
        await atualizarProduto(editingId, form, token);
        setStatus("Produto atualizado.");
      } else {
        await criarProduto(form, token);
        setStatus("Produto cadastrado.");
      }

      resetForm();
      await loadProducts();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const editProduct = (produto) => {
    setEditingId(produto.id);
    setForm({
      ...emptyForm,
      ...produto,
      imagem: produto.imagem.replace(process.env.PUBLIC_URL || "", ""),
      status: produto.status || "publicado",
      destaque: Boolean(produto.destaque || produto.exibirHome),
      exibirHome: Boolean(produto.exibirHome || produto.destaque),
      exibirCatalogo: produto.exibirCatalogo !== false,
      exibirExportacao: Boolean(produto.exibirExportacao),
      ativo: produto.ativo !== false,
    });
    setStatus("");
    setError("");
  };

  const deleteProduct = async (produto) => {
    const confirmed = window.confirm(`Remover ${produto.nome} do catalogo publico?`);
    if (!confirmed) {
      return;
    }

    try {
      await removerProduto(produto.id, token);
      setStatus("Produto removido do catalogo publico.");
      await loadProducts();
      if (editingId === produto.id) {
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
      updateForm("imagem", upload.caminho);
      setStatus("Imagem enviada. Agora salve o produto.");
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
          <div>
            <Eyebrow>Administrativo</Eyebrow>
            <Title>Produtos dinamicos para novas linhas da marca.</Title>
            <Lead>
              Cadastre cachacas, licores e derivados da cana-de-acucar com ficha tecnica,
              status de publicacao e exibicao por area do site.
            </Lead>
          </div>
        </HeaderGrid>

        <AdminAuthGate>
        <AdminShell />

        <Layout>
          <Panel>
            <PanelBody>
              <Form onSubmit={handleSubmit}>
                <FormGrid>
                  <Field>
                    ID do produto
                    <Input
                      value={form.id}
                      onChange={(event) => updateForm("id", event.target.value)}
                      placeholder="ex: melado-premium"
                      disabled={isEditing}
                    />
                    <Help>Vira a URL do produto.</Help>
                  </Field>

                  <Field>
                    Nome
                    <Input value={form.nome} onChange={(event) => updateForm("nome", event.target.value)} />
                  </Field>

                  <Field>
                    Linha
                    <Input
                      value={form.linha}
                      onChange={(event) => updateForm("linha", event.target.value)}
                      placeholder="ex: Derivados da cana"
                    />
                  </Field>

                  <Field>
                    Status
                    <Select value={form.status} onChange={(event) => updateForm("status", event.target.value)}>
                      <option value="publicado">Publicado</option>
                      <option value="lancamento">Lancamento</option>
                      <option value="rascunho">Rascunho</option>
                      <option value="oculto">Oculto</option>
                      <option value="fora-de-linha">Fora de linha</option>
                    </Select>
                  </Field>

                  <Field>
                    Volume
                    <Input
                      value={form.volume}
                      onChange={(event) => updateForm("volume", event.target.value)}
                      placeholder="ex: 500 ml"
                    />
                  </Field>

                  <Field>
                    Teor alcoolico
                    <Input
                      value={form.teorAlcoolico}
                      onChange={(event) => updateForm("teorAlcoolico", event.target.value)}
                      placeholder="ex: 18%"
                    />
                  </Field>

                  <Field>
                    Embalagem
                    <Input
                      value={form.embalagem}
                      onChange={(event) => updateForm("embalagem", event.target.value)}
                      placeholder="ex: garrafa de vidro"
                    />
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
                    Perfil comercial
                    <TextArea value={form.perfil} onChange={(event) => updateForm("perfil", event.target.value)} />
                  </FullField>

                  <FullField>
                    Descricao longa
                    <TextArea
                      value={form.descricaoLonga}
                      onChange={(event) => updateForm("descricaoLonga", event.target.value)}
                      placeholder="Texto mais completo para detalhe, catalogo B2B ou exportacao."
                    />
                  </FullField>

                  <FullField>
                    Ingredientes
                    <TextArea
                      value={form.ingredientes}
                      onChange={(event) => updateForm("ingredientes", event.target.value)}
                      placeholder="Informe somente dados revisados pela marca."
                    />
                  </FullField>

                  <FullField>
                    Imagem
                    <UploadRow>
                      <Input
                        value={form.imagem}
                        onChange={(event) => updateForm("imagem", event.target.value)}
                        placeholder="/produtos/arquivo.webp ou https://..."
                      />
                      <Button as="label" type="button" $variant="ghost">
                        <FiUpload /> {uploading ? "Enviando" : "Enviar imagem"}
                        <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={uploadImage} />
                      </Button>
                    </UploadRow>
                    <Help>Escolha JPG, PNG ou WEBP do computador. Limite: 5 MB.</Help>
                  </FullField>
                </FormGrid>

                <CheckGrid>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={form.exibirHome}
                      onChange={(event) => updateForm("exibirHome", event.target.checked)}
                    />
                    Exibir na pagina inicial
                  </CheckRow>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={form.exibirCatalogo}
                      onChange={(event) => updateForm("exibirCatalogo", event.target.checked)}
                    />
                    Exibir no catalogo
                  </CheckRow>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={form.exibirExportacao}
                      onChange={(event) => updateForm("exibirExportacao", event.target.checked)}
                    />
                    Usar em exportacao/B2B
                  </CheckRow>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={form.ativo}
                      onChange={(event) => updateForm("ativo", event.target.checked)}
                    />
                    Registro ativo
                  </CheckRow>
                </CheckGrid>

                <Preview>
                  {form.imagem ? <img src={form.imagem} alt="" /> : null}
                  <div>
                    <Eyebrow>{form.linha || "Linha do produto"}</Eyebrow>
                    <h3>{form.nome || "Nome do produto"}</h3>
                    <p>{form.perfil || "Resumo comercial do produto."}</p>
                  </div>
                </Preview>

                <Actions>
                  <Button type="submit">
                    <FiSave /> {isEditing ? "Salvar alteracoes" : "Cadastrar produto"}
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
                <Button type="button" $variant="ghost" onClick={loadProducts}>
                  <FiRefreshCw /> Atualizar lista
                </Button>
              </Actions>
            </PanelBody>

            <ProductList>
              {sortedProducts.map((produto) => (
                <ProductItem key={produto.id}>
                  <ProductImage src={produto.imagem} alt={produto.nome} />
                  <ProductInfo>
                    <strong>{produto.nome}</strong>
                    <span>
                      {produto.linha} - ordem {produto.ordem || 0}
                    </span>
                    <StatusTag $status={produto.status || "publicado"}>{produto.status || "publicado"}</StatusTag>
                    <Actions style={{ marginTop: 12 }}>
                      <Button type="button" $variant="ghost" onClick={() => editProduct(produto)}>
                        <FiEdit3 /> Editar
                      </Button>
                      <Button as="a" href={`/produto/${produto.id}`} target="_blank" rel="noreferrer" $variant="ghost">
                        <FiEye /> Ver
                      </Button>
                      <Button type="button" $variant="ghost" onClick={() => deleteProduct(produto)}>
                        <FiTrash2 /> Remover
                      </Button>
                    </Actions>
                  </ProductInfo>
                </ProductItem>
              ))}
            </ProductList>
          </Panel>
        </Layout>
        </AdminAuthGate>
      </Main>
      <Footer />
    </Page>
  );
}

export default AdminProdutos;
