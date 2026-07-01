import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocaleSwitchLinks } from "../../contexts/LocaleContext";

const SITE_URL = "https://amaisindicada.com.br";

const hreflangByLang = {
  pt: "pt-BR",
  en: "en",
  es: "es",
};

function Seo({ title, description, titleKey, descriptionKey, noindex, jsonLd }) {
  const { t } = useTranslation();
  const { isLocalized, links, current } = useLocaleSwitchLinks();

  const resolvedTitle = title || (titleKey ? t(titleKey) : undefined);
  const resolvedDescription = description || (descriptionKey ? t(descriptionKey) : undefined);

  if (noindex) {
    return (
      <Helmet>
        {resolvedTitle ? <title>{resolvedTitle}</title> : null}
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
    );
  }

  const canonicalPath = isLocalized ? links[current] : links.pt;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      {resolvedTitle ? <title>{resolvedTitle}</title> : null}
      {resolvedTitle ? <meta property="og:title" content={resolvedTitle} /> : null}
      {resolvedTitle ? <meta name="twitter:title" content={resolvedTitle} /> : null}
      {resolvedDescription ? <meta name="description" content={resolvedDescription} /> : null}
      {resolvedDescription ? <meta property="og:description" content={resolvedDescription} /> : null}
      {resolvedDescription ? <meta name="twitter:description" content={resolvedDescription} /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      {isLocalized ? (
        <>
          <link rel="alternate" hrefLang={hreflangByLang.pt} href={`${SITE_URL}${links.pt}`} />
          <link rel="alternate" hrefLang={hreflangByLang.en} href={`${SITE_URL}${links.en}`} />
          <link rel="alternate" hrefLang={hreflangByLang.es} href={`${SITE_URL}${links.es}`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${links.pt}`} />
        </>
      ) : null}
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Helmet>
  );
}

export default Seo;
