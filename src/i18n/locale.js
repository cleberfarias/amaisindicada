export const SUPPORTED_LANGS = ["en", "es"];
export const DEFAULT_LANG = "pt";

export const getLangFromPathname = (pathname) => {
  const segment = String(pathname || "").split("/").filter(Boolean)[0];
  return SUPPORTED_LANGS.includes(segment) ? segment : DEFAULT_LANG;
};

export const stripLangPrefix = (pathname, lang) => {
  if (lang === DEFAULT_LANG) {
    return pathname || "/";
  }

  const rest = String(pathname || "").slice(`/${lang}`.length);
  return rest || "/";
};

export const buildLocalizedPath = (lang, path) => {
  const normalized = path === "/" ? "" : path;

  if (lang === DEFAULT_LANG) {
    return normalized || "/";
  }

  return `/${lang}${normalized}`;
};
