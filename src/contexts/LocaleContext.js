import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, buildLocalizedPath, stripLangPrefix } from "../i18n/locale";

const LocaleContext = createContext({ lang: "pt", isLocalized: false });

const htmlLang = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

export function LocaleLayout({ lang }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = htmlLang[lang] || "pt-BR";
  }, [lang, i18n]);

  const value = useMemo(() => ({ lang, isLocalized: true }), [lang]);

  return (
    <LocaleContext.Provider value={value}>
      <Outlet />
    </LocaleContext.Provider>
  );
}

export const useLocalizedPath = () => {
  const { lang } = useContext(LocaleContext);
  return (path) => buildLocalizedPath(lang, path);
};

export const useLocaleSwitchLinks = () => {
  const { lang, isLocalized } = useContext(LocaleContext);
  const location = useLocation();
  const bare = stripLangPrefix(location.pathname, lang);

  return {
    isLocalized,
    links: {
      pt: buildLocalizedPath("pt", bare),
      en: buildLocalizedPath("en", bare),
      es: buildLocalizedPath("es", bare),
    },
    current: lang,
  };
};

export { SUPPORTED_LANGS };
