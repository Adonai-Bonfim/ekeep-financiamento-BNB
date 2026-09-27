import iconsReference from "@/assets/credentials-icons-reference.png";

// Viewports show only the original icons, preserving the supplied artwork.
const iconViewports: Record<string, string> = {
  experience: "203 45 76 76",
  governance: "665 46 76 76",
  solutions: "1129 47 76 76",
};

const credentials = [
  {
    title: "+20 anos de experiência",
    description:
      "Experiência acumulada pelos sócios em auditoria, consultoria e gestão empresarial.",
    icon: "experience",
  },
  {
    title: "Governança Corporativa",
    description:
      "Atuação voltada ao fortalecimento da transparência, conformidade e segurança das organizações.",
    icon: "governance",
  },
  {
    title: "Acompanhamento em todas as etapas",
    description: "Planejamento, execução, análise e suporte até a efetiva utilização dos dados.",
    icon: "solutions",
  },
];

export function Credentials() {
  return (
    <section
      aria-label="Experiência e atuação da Ekeep"
      className="credentials-section bg-background pb-2 pt-24 sm:pt-28"
    >
      <div className="page-container credentials-grid grid gap-x-6 gap-y-20">
        {credentials.map(({ title, description, icon }) => (
          <article
            key={title}
            className="relative rounded-[1.75rem] bg-gradient-to-r from-[#f04b12] to-[#ff7045] px-5 pb-6 pt-18 text-center"
          >
            <div
              aria-hidden="true"
              className="credentials-badge absolute left-1/2 top-0 grid h-26 w-26 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#1b1b1b] text-white"
            >
              <svg
                viewBox={iconViewports[icon]}
                width="64"
                height="64"
                aria-hidden="true"
                focusable="false"
                className="overflow-hidden"
              >
                <image href={iconsReference} width="1405" height="365" />
              </svg>
            </div>
            <h2 className="text-xl font-extrabold leading-tight text-[#1b1b1b]">{title}</h2>
            <p className="mx-auto mt-5 max-w-sm text-base font-medium leading-snug text-white sm:text-lg">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
