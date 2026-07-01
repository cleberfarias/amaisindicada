import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiMail, FiMapPin, FiMessageCircle, FiSend } from "react-icons/fi";
import Header from "../componentes/Header/Header";
import Footer from "../componentes/FooterOpcoes/FooterOpcoes";
import Seo from "../componentes/Seo/Seo";
import { theme } from "../styles/theme";

const interesseIds = ["consumidor", "lojista", "representante", "exportacao", "eventos"];

const Page = styled.div`
  min-height: 100vh;
  background: ${theme.colors.cream};
  color: ${theme.colors.brown};
`;

const Main = styled.main`
  width: min(${theme.layout.maxWidth}, calc(100% - 32px));
  margin: 0 auto;
  padding: 82px 0;
`;

const HeaderBlock = styled.div`
  max-width: 760px;
  margin-bottom: 34px;
`;

const Eyebrow = styled.span`
  color: ${theme.colors.teal};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 14px 0 0;
  font-family: ${theme.fonts.heading};
  font-size: clamp(2.8rem, 6vw, 5.4rem);
  line-height: 0.96;
`;

const Lead = styled.p`
  margin: 18px 0 0;
  color: ${theme.colors.brownSoft};
  line-height: 1.8;
  font-size: 1.05rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section`
  padding: clamp(24px, 4vw, 38px);
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  background: ${theme.colors.white};
  box-shadow: 0 16px 44px rgba(48, 38, 29, 0.08);
`;

const FormGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
  color: ${theme.colors.brown};
  font-weight: 800;
`;

const Input = styled.input`
  min-height: 46px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 14px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const Select = styled.select`
  min-height: 46px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 0 14px;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const Textarea = styled.textarea`
  min-height: 130px;
  border: 1px solid ${theme.colors.line};
  border-radius: 8px;
  padding: 14px;
  resize: vertical;
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 999px;
  color: ${theme.colors.white};
  background: ${theme.colors.teal};
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.tealDark};
  }
`;

const SecondaryLink = styled(ActionLink)`
  color: ${theme.colors.brown};
  background: ${theme.colors.cream};
  border: 1px solid ${theme.colors.line};

  &:hover {
    color: ${theme.colors.brown};
    background: ${theme.colors.warm};
  }
`;

const ContactList = styled.ul`
  display: grid;
  gap: 16px;
  margin: 24px 0 0;
  padding: 0;
`;

const ContactItem = styled.li`
  list-style: none;

  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: ${theme.colors.brown};
    text-decoration: none;
    line-height: 1.6;
  }

  svg {
    color: ${theme.colors.teal};
  }
`;

const Preview = styled.div`
  margin-top: 22px;
  padding: 18px;
  border-radius: 8px;
  color: ${theme.colors.brownSoft};
  background: ${theme.colors.cream};
  line-height: 1.7;
`;

function FaleConosco() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    interesseId: interesseIds[0],
    mensagem: "",
  });

  const interesseLabel = t(`faleConosco.interesses.${form.interesseId}`);

  const mensagemGerada = useMemo(() => {
    const nome = form.nome.trim() || t("faleConosco.defaultNome");
    const mensagem = form.mensagem.trim() || t("faleConosco.defaultMensagem");
    return t("faleConosco.generatedTemplate", { nome, interesse: interesseLabel, mensagem });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, interesseLabel, t]);

  const encodedMessage = encodeURIComponent(mensagemGerada);

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  return (
    <Page>
      <Seo titleKey="faleConosco.seo.title" descriptionKey="faleConosco.seo.description" />
      <Header />
      <Main>
        <HeaderBlock>
          <Eyebrow>{t("faleConosco.hero.eyebrow")}</Eyebrow>
          <Title>{t("faleConosco.hero.title")}</Title>
          <Lead>{t("faleConosco.hero.lead")}</Lead>
        </HeaderBlock>

        <Grid>
          <Panel>
            <FormGrid>
              <Label>
                {t("faleConosco.form.nome")}
                <Input value={form.nome} onChange={updateField("nome")} placeholder={t("faleConosco.form.nomePlaceholder")} />
              </Label>
              <Label>
                {t("faleConosco.form.email")}
                <Input type="email" value={form.email} onChange={updateField("email")} placeholder={t("faleConosco.form.emailPlaceholder")} />
              </Label>
              <Label>
                {t("faleConosco.form.interesseLabel")}
                <Select value={form.interesseId} onChange={updateField("interesseId")}>
                  {interesseIds.map((id) => (
                    <option key={id} value={id}>
                      {t(`faleConosco.interesses.${id}`)}
                    </option>
                  ))}
                </Select>
              </Label>
              <Label>
                {t("faleConosco.form.mensagem")}
                <Textarea value={form.mensagem} onChange={updateField("mensagem")} placeholder={t("faleConosco.form.mensagemPlaceholder")} />
              </Label>
            </FormGrid>

            <Preview>
              <strong>{t("faleConosco.generatedLabel")}</strong>
              <br />
              {mensagemGerada}
            </Preview>

            <ButtonRow>
              <ActionLink href={`https://wa.me/5549999269857?text=${encodedMessage}`} target="_blank" rel="noreferrer">
                <FiMessageCircle /> {t("faleConosco.sendWhatsapp")}
              </ActionLink>
              <SecondaryLink href={`mailto:contato@amaisindicada.com.br?subject=${encodeURIComponent(interesseLabel)}&body=${encodedMessage}`}>
                <FiSend /> {t("faleConosco.sendEmail")}
              </SecondaryLink>
            </ButtonRow>
          </Panel>

          <Panel>
            <Eyebrow>{t("faleConosco.channels.eyebrow")}</Eyebrow>
            <Lead>{t("faleConosco.channels.lead")}</Lead>

            <ContactList>
              <ContactItem>
                <a href="https://contate.me/amaisindicada" target="_blank" rel="noreferrer">
                  <FiMessageCircle /> {t("faleConosco.channels.whatsapp")}
                </a>
              </ContactItem>
              <ContactItem>
                <a href="mailto:contato@amaisindicada.com.br">
                  <FiMail /> contato@amaisindicada.com.br
                </a>
              </ContactItem>
              <ContactItem>
                <a href="https://www.google.com/maps?q=-27.65963231609629,-51.35811403175321" target="_blank" rel="noreferrer">
                  <FiMapPin /> {t("faleConosco.channels.address")}
                </a>
              </ContactItem>
            </ContactList>
          </Panel>
        </Grid>
      </Main>
      <Footer />
    </Page>
  );
}

export default FaleConosco;
