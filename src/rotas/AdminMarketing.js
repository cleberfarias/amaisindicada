import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FiEdit3, FiPlus, FiRefreshCw, FiSave, FiTrash2, FiUpload } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Seo from "../componentes/Seo/Seo";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import AdminShell from "../componentes/AdminShell/AdminShell";
import AdminAuthGate from "../componentes/AdminShell/AdminAuthGate";
import { useAdminAuth } from "../contexts/AdminAuthContext";
import {
  atualizarBanner,
  criarBanner,
  enviarImagemProduto,
  listarBannersAdmin,
  removerBanner,
} from "../services/produtosApi";
import { theme } from "../styles/theme";

const emptyForm = {
  id: "",
  area: "home-hero",
  titulo: "",
  subtitulo: "",
  selo: "",
  imagem: "",
  imagemAlt: "",
  ctaPrincipalTexto: "Ver catalogo",
  ctaPrincipalUrl: "/catalogo",
  ctaSecundarioTexto: "Area de exportacao",
  ctaSecundarioUrl: "/exportacao",
  status: "publicado",
  ordem: 1,
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
  max-width: 850px;
  margin: 12px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.6rem, 6vw, 5.2rem);
  line-height: 0.95;
`;

const Lead = styled.p`
  max-width: 760px;
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
  padding: 22px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const Grid = styled.div`
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
  margin-bottom: 14px;
  color: ${theme.colors.brown};
  font-weight: 800;
`;

const FullField = styled(Field)`
  grid-column: 1 / -1;
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

const Select = styled.select`
  min-height: 44px;
  width: 100%;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  outline-color: ${theme.colors.teal};
`;

const TextArea = styled.textarea`
  min-height: 110px;
  resize: vertical;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 12px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  line-height: 1.6;
  outline-color: ${theme.colors.teal};
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
  margin-top: 12px;
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
`;

const Preview = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 8px;
  background: ${theme.colors.brown};
  color: ${theme.colors.white};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-radius: 8px;
  }

  h3 {
    margin: 8px 0 10px;
    font-family: ${theme.fonts.heading};
    font-size: clamp(2.2rem, 5vw, 4rem);
    line-height: 0.95;
  }

  p {
    margin: 0;
    color: rgba(255, 246, 232, 0.8);
    line-height: 1.7;
  }
`;

const BannerList = styled.div`
  display: grid;
  gap: 12px;
`;

const BannerItem = styled.article`
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  padding: 12px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.cream};

  img {
    width: 96px;
    height: 70px;
    object-fit: cover;
    border-radius: 8px;
  }

  strong {
    display: block;
    font-family: ${theme.fonts.heading};
    font-size: 1.35rem;
    line-height: 1;
  }

  span {
    display: block;
    margin-top: 6px;
    color: ${theme.colors.brownSoft};
  }
`;

const Status = styled.div`
  margin-top: 14px;
  color: ${theme.colors.tealDark};
  font-weight: 800;
`;

const ErrorBox = styled.div`
  margin-top: 14px;
  color: #8a2e1f;
  font-weight: 800;
`;

function AdminMarketing() {
  const { token } = useAdminAuth();
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const sortedBanners = useMemo(
    () => [...banners].sort((a, b) => (a.ordem || 0) - (b.ordem || 0)),
    [banners]
  );

  const loadBanners = useCallback(async () => {
    if (!token) {
      setBanners([]);
      return;
    }

    try {
      setBanners(await listarBannersAdmin(token));
    } catch (loadError) {
      setError(loadError.message);
    }
  }, [token]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId("");
    setError("");
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
      setStatus("Imagem enviada. Agora salve o banner.");
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");

    try {
      if (editingId) {
        await atualizarBanner(editingId, form, token);
        setStatus("Banner atualizado.");
      } else {
        await criarBanner(form, token);
        setStatus("Banner cadastrado.");
      }

      resetForm();
      await loadBanners();
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const editBanner = (banner) => {
    setEditingId(banner.id);
    setForm({
      ...emptyForm,
      ...banner,
      imagem: banner.imagem.replace(process.env.PUBLIC_URL || "", ""),
      ativo: banner.ativo !== false,
    });
    setStatus("");
    setError("");
  };

  const deleteBanner = async (banner) => {
    const confirmed = window.confirm(`Remover o banner ${banner.titulo}?`);
    if (!confirmed) {
      return;
    }

    try {
      await removerBanner(banner.id, token);
      setStatus("Banner removido.");
      await loadBanners();
      if (editingId === banner.id) {
        resetForm();
      }
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  return (
    <Page>
      <Seo noindex title="Admin | Marketing" />
      <Header />
      <Main>
        <HeaderGrid>
          <div>
            <Eyebrow>Administrativo</Eyebrow>
            <Title>Marketing controla os banners do site.</Title>
            <Lead>
              Edite o banner principal da Home, troque imagem, chamada e botoes
              sem mexer no codigo.
            </Lead>
          </div>
        </HeaderGrid>

        <AdminAuthGate>
        <AdminShell />

        <Layout>
          <Panel>
            <form onSubmit={handleSubmit}>
              <Grid>
                <Field>
                  ID do banner
                  <Input
                    value={form.id}
                    onChange={(event) => updateForm("id", event.target.value)}
                    disabled={Boolean(editingId)}
                    placeholder="home-principal"
                  />
                </Field>

                <Field>
                  Area
                  <Select value={form.area} onChange={(event) => updateForm("area", event.target.value)}>
                    <option value="home-hero">Banner principal da Home</option>
                  </Select>
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
                  Selo superior
                  <Input value={form.selo} onChange={(event) => updateForm("selo", event.target.value)} />
                </FullField>

                <FullField>
                  Titulo
                  <Input value={form.titulo} onChange={(event) => updateForm("titulo", event.target.value)} />
                </FullField>

                <FullField>
                  Subtitulo
                  <TextArea value={form.subtitulo} onChange={(event) => updateForm("subtitulo", event.target.value)} />
                </FullField>

                <FullField>
                  Imagem do banner
                  <UploadRow>
                    <Input
                      value={form.imagem}
                      onChange={(event) => updateForm("imagem", event.target.value)}
                      placeholder="/produtos/uploads/banner.webp"
                    />
                    <Button as="label" type="button" $variant="ghost">
                      <FiUpload /> {uploading ? "Enviando" : "Enviar imagem"}
                      <input type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={uploadImage} />
                    </Button>
                  </UploadRow>
                </FullField>

                <FullField>
                  Texto alternativo da imagem
                  <Input value={form.imagemAlt} onChange={(event) => updateForm("imagemAlt", event.target.value)} />
                </FullField>

                <Field>
                  Botao principal
                  <Input
                    value={form.ctaPrincipalTexto}
                    onChange={(event) => updateForm("ctaPrincipalTexto", event.target.value)}
                  />
                </Field>

                <Field>
                  Link principal
                  <Input
                    value={form.ctaPrincipalUrl}
                    onChange={(event) => updateForm("ctaPrincipalUrl", event.target.value)}
                  />
                </Field>

                <Field>
                  Botao secundario
                  <Input
                    value={form.ctaSecundarioTexto}
                    onChange={(event) => updateForm("ctaSecundarioTexto", event.target.value)}
                  />
                </Field>

                <Field>
                  Link secundario
                  <Input
                    value={form.ctaSecundarioUrl}
                    onChange={(event) => updateForm("ctaSecundarioUrl", event.target.value)}
                  />
                </Field>

                <FullField>
                  <CheckRow>
                    <input
                      type="checkbox"
                      checked={form.ativo}
                      onChange={(event) => updateForm("ativo", event.target.checked)}
                    />
                    Banner ativo
                  </CheckRow>
                </FullField>
              </Grid>

              <Preview>
                {form.imagem ? <img src={form.imagem} alt="" /> : null}
                <div>
                  <Eyebrow>{form.selo || "Selo do banner"}</Eyebrow>
                  <h3>{form.titulo || "Titulo do banner"}</h3>
                  <p>{form.subtitulo || "Texto de apoio do banner."}</p>
                </div>
              </Preview>

              <Actions>
                <Button type="submit">
                  <FiSave /> {editingId ? "Salvar banner" : "Cadastrar banner"}
                </Button>
                <Button type="button" $variant="ghost" onClick={resetForm}>
                  <FiPlus /> Novo
                </Button>
              </Actions>
            </form>

            {status ? <Status>{status}</Status> : null}
            {error ? <ErrorBox>{error}</ErrorBox> : null}
          </Panel>

          <Panel>
            <Actions style={{ marginTop: 0, marginBottom: 16 }}>
              <Button type="button" $variant="ghost" onClick={loadBanners}>
                <FiRefreshCw /> Atualizar banners
              </Button>
            </Actions>

            <BannerList>
              {sortedBanners.map((banner) => (
                <BannerItem key={banner.id}>
                  <img src={banner.imagem} alt={banner.imagemAlt || banner.titulo} />
                  <div>
                    <strong>{banner.titulo}</strong>
                    <span>{banner.area} - {banner.status}</span>
                    <Actions>
                      <Button type="button" $variant="ghost" onClick={() => editBanner(banner)}>
                        <FiEdit3 /> Editar
                      </Button>
                      <Button type="button" $variant="ghost" onClick={() => deleteBanner(banner)}>
                        <FiTrash2 /> Remover
                      </Button>
                    </Actions>
                  </div>
                </BannerItem>
              ))}
            </BannerList>
          </Panel>
        </Layout>
        </AdminAuthGate>
      </Main>
      <Footer />
    </Page>
  );
}

export default AdminMarketing;
