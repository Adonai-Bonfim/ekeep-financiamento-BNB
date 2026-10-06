// Configure VITE_SITE_URL with the final financing page domain before publishing.
const configuredUrl = import.meta.env["VITE_SITE_URL"] as string | undefined;
const url = configuredUrl ? new URL("/", configuredUrl).href : undefined;
const title = "Captação de Financiamento Banco do Nordeste | Ekeep";
const description =
  "Assessoria para médias e grandes empresas na captação de financiamento no Banco do Nordeste. Avaliação de linhas, organização documental e acompanhamento com a Ekeep.";
export const landingSeo = {
  meta: [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    ...(url ? [{ property: "og:url", content: url }] : []),
    { property: "og:site_name", content: "Ekeep Consultores" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: url ? [{ rel: "canonical", href: url }] : [],
  scripts: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Assessoria para captação de financiamento no Banco do Nordeste",
        description,
        ...(url ? { url } : {}),
        provider: {
          "@type": "Organization",
          name: "Ekeep Consultores",
          telephone: "+5571981948895",
          email: "contato@ekeepconsultores.com.br",
        },
      }).replace(/</g, "\\u003c"),
    },
  ],
};
