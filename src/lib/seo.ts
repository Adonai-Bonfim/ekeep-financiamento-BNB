const url = "https://inventario.ekeepconsultores.com.br/";
const title = "Inventário de Estoque e Imobilizado na Bahia | Ekeep";
const description = "Inventário e contagem de estoque, inventário de imobilizado, laudos de avaliação de bens e teste de impairment em toda a Bahia, com foco em Salvador e região metropolitana.";

// Confirmed service coverage, not office addresses or a ranking priority setting.
const areaServed = [
  { "@type": "State", name: "Bahia", containedInPlace: { "@type": "Country", name: "Brasil" } },
  { "@type": "City", name: "Salvador", containedInPlace: { "@type": "State", name: "Bahia" } },
  { "@type": "AdministrativeArea", name: "Região Metropolitana de Salvador", containedInPlace: { "@type": "State", name: "Bahia" } },
];

// Service names and synonyms supplied by Ekeep; no ratings or unsupported claims.
const services = [
  { name: "Inventário de estoque", alternateName: ["Contagem de estoque"] },
  { name: "Inventário de imobilizado", alternateName: ["Inventário de bens", "Inventário de bens do ativo imobilizado"] },
  { name: "Laudo de Avaliação de Ativos", alternateName: ["Laudo de avaliação de bens", "Laudo de avaliação de Imobilizado"] },
  { name: "Teste de Impairment", alternateName: ["Laudo de Impairment", "Impairment"] },
];

export const landingSeo = {
  meta: [
    { title },
    { name: "description", content: description },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Ekeep Consultores" },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: [{ rel: "canonical", href: url }],
  scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${url}#organization`, name: "Ekeep Consultores", url, telephone: "+5571981948895", email: "contato@ekeepconsultores.com.br", areaServed },
        { "@type": "WebSite", "@id": `${url}#website`, url, name: "Ekeep Consultores", inLanguage: "pt-BR", publisher: { "@id": `${url}#organization` } },
        { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "pt-BR", isPartOf: { "@id": `${url}#website` }, about: services.map((_, i) => ({ "@id": `${url}#service-${i + 1}` })) },
        ...services.map((service, i) => ({ "@type": "Service", "@id": `${url}#service-${i + 1}`, ...service, areaServed, provider: { "@id": `${url}#organization` } })),
      ],
    }).replace(/</g, "\\u003c"),
  }],
};
