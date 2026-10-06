import { landingSeo } from "@/lib/seo";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Coins,
  Clock,
  FileText,
  Users,
  RefreshCw,
  TrendingUp,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  BriefcaseBusiness,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Search,
  X,
} from "lucide-react";

import { Logo } from "@/components/ekeep/Logo";
import { HeaderLogo } from "@/components/ekeep/HeaderLogo";
import { Credentials } from "@/components/ekeep/Credentials";
import { ResponsiveImage } from "@/components/ekeep/ResponsiveImage";
import { LeadForm, whatsappLink } from "@/components/ekeep/LeadForm";
import heroImg from "@/assets/hero-financing.jpg";
import solarEngineerImg from "@/assets/solar-engineer.jpg";
import financingMeetingImg from "@/assets/financing-meeting.jpg";
import stockImg from "@/assets/office-assets.jpg";

export const Route = createFileRoute("/")({
  head: () => landingSeo,
  component: Landing,
});

const NAV = [
  { label: "Financiamentos", href: "#solucoes" },
  { label: "Como Funciona", href: "#processo" },
  { label: "Benefícios", href: "#diferenciais" },
  { label: "Contato", href: "#contato" },
];

const HEADER_NAV = [
  { label: "Home", href: "https://www.ekeepconsultores.com.br/" },
  ...NAV,
];

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const bar = headerBarRef.current;
    const landing = bar?.closest<HTMLElement>(".landing");
    if (!bar || !landing) return;
    // Measure only the permanent bar, so opening the menu doesn't resize the hero.
    const updateHeight = () => {
      const header = bar.parentElement;
      const border = header ? parseFloat(getComputedStyle(header).borderBottomWidth) || 0 : 0;
      landing.style.setProperty(
        "--header-height",
        `${bar.getBoundingClientRect().height + border}px`,
      );
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      landing.style.removeProperty("--header-height");
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 80rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);
  return (
    <header className="site-header sticky top-0 z-50 border-b border-white/15 bg-black/60 backdrop-blur-md text-white">
      <div
        ref={headerBarRef}
        className="page-container grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3"
      >
        <a
          href="#top"
          className="min-w-0 justify-self-start"
          aria-label="Ekeep — início"
          onClick={() => setOpen(false)}
        >
          <HeaderLogo />
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
            {HEADER_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/90 transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contato" className="btn-base btn-primary hidden sm:inline-flex">
            Avaliar meu projeto <ArrowRight size={16} />
          </a>
          <button
            type="button"
            ref={toggleRef}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-white/25 text-white xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navegação móvel"
          className="mobile-nav border-t border-white/15 bg-black px-4 py-3 xl:hidden"
        >
          {HEADER_NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/15 py-3 text-sm font-medium text-white/90 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="btn-base btn-primary mt-3 w-full"
          >
            Avaliar meu projeto
          </a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      <ResponsiveImage
        asset="hero-financing"
        src={heroImg}
        alt="Profissionais analisando gráficos financeiros em uma reunião ao entardecer"
        width={1672}
        height={941}
        fetchPriority="high"
        className="hero-background-image absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-transparent to-black/40 sm:hidden" />
      <div className="page-container hero-content">
        <h1 className="financing-hero-title hero-title font-extrabold text-background">
          <span className="block">Não deixe o crédito</span>{" "}
          <span className="block text-primary">para a hora da urgência.</span>{" "}
          <span className="block">Planeje o financiamento</span>{" "}
          <span className="block text-primary">da sua empresa</span>{" "}
          <span className="block">com antecedência</span>
        </h1>
        <p className="hero-subtitle mt-5 max-w-3xl text-base leading-relaxed text-background/75">
          A Ekeep simplifica o caminho até o financiamento, identificando as oportunidades de crédito do Banco do Nordeste e acompanhando cada etapa para que sua empresa mantenha o foco no crescimento.
        </p>
        <div className="hero-actions flex flex-wrap gap-3">
          <a href="#contato" className="btn-base btn-primary">
            Avaliar meu projeto <ArrowRight size={16} />
          </a>
          <a
            href={whatsappLink(
              "Olá, Ekeep! Gostaria de falar sobre captação de financiamento no Banco do Nordeste.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-outline-light"
          >
            <MessageCircle size={16} /> Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

const SOLUTIONS = [
  {
    asset: "financing-meeting" as const,
    img: financingMeetingImg,
    alt: "Profissionais analisando gráficos financeiros em uma reunião",
    icon: Building2,
    title: "Financie os próximos passos da sua empresa.",
    subtitle: "Conheça possibilidades de crédito para investir, modernizar e ampliar sua operação.",
    items: [
      "Capital de giro.",
      "Aquisição de software.",
      "Máquinas e equipamentos",
      "Aquisição de imóvel empresarial.",
      "Construção, reformas e ampliações",
    ],
  },
  {
    asset: "solar-engineer" as const,
    img: solarEngineerImg,
    alt: "Engenheiro inspecionando painéis de um parque solar com um tablet",
    icon: BarChart3,
    title: "Seu projeto pode ter uma linha de crédito específica.",
    subtitle: "O Banco do Nordeste possui soluções para diferentes atividades e finalidades de investimento.",
    items: [
      "Saúde.",
      "Turismo.",
      "Agronegócio.",
      "Inovação e tecnologia.",
      "Energia solar e eficiência energética.",
      "Equipamentos para redução de emissões."
    ],
  },
];

function Solutions() {
  return (
    <section id="solucoes" className="bg-background section-space">
      <div className="page-container">
        <div>
          <p className="eyebrow">Nossas soluções</p>
        </div>
        <div className="mt-3 flex flex-col items-start gap-3 text-left">
          <h2 className="section-title font-extrabold">O que sua empresa precisa financiar?</h2>
          <p className="text-sm text-muted-foreground">
            Possibilidades para investir, modernizar e expandir. A linha adequada depende do
            enquadramento da empresa e do projeto.
          </p>
        </div>

        <div className="solutions-grid mt-8 grid gap-6">
          {SOLUTIONS.map(({ asset, img, alt, icon: Icon, title, subtitle, items }) => (
            <article
              key={title}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft transition hover:shadow-card solution-card"
            >
              <ResponsiveImage
                asset={asset}
                sizes="(min-width: 75rem) 11rem, (min-width: 60rem) 45vw, (min-width: 40rem) 30vw, 100vw"
                src={img}
                alt={alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="solution-image"
              />
              <div className="min-w-0 flex-1 p-5">
                <div className="flex items-start gap-3">
                  <Icon size={24} className="mt-0.5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{subtitle}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check size={14} className="shrink-0 text-primary" strokeWidth={3} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Avaliar meu projeto <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <aside className="women-financing-banner mt-6" aria-labelledby="women-financing-title">
          <div className="women-financing-photo" aria-hidden="true">
            <img src="/businesswoman-financing.webp" alt="" width={720} height={720} loading="lazy" />
          </div>
          <div className="women-financing-content">
            <span className="women-financing-label">DESTAQUE</span>
            <h3 id="women-financing-title">Sua empresa é liderada por mulheres?</h3>
            <p>Algumas linhas de financiamento podem oferecer condições diferenciadas de cobertura para empresas com controle feminino, conforme os critérios do Banco do Nordeste.</p>
            <p>Consulte as possibilidades para o perfil da sua empresa.</p>
          </div>
          <div className="women-financing-action">
            <svg viewBox="0 0 96 64" width="80" height="54" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <g opacity="0.45"><rect x="9" y="23" width="12" height="18" rx="6" /><path d="M3 57v-7c0-5 5-7 12-7s12 2 12 7v7" /><rect x="75" y="23" width="12" height="18" rx="6" /><path d="M69 57v-7c0-5 5-7 12-7s12 2 12 7v7" /></g>
              <path d="M33 39c-3-3-4-7-3-12l3-13c2-8 7-12 15-12s13 4 15 12l3 13c1 5 0 9-3 12M37 19c6 0 11-4 13-9 2 6 5 10 10 12v9c0 9-5 16-12 16s-12-7-12-16V19M39 43v7l-10 4c-4 2-5 4-5 8m33-19v7l10 4c4 2 5 4 5 8" />
            </svg>
            <a href="#contato" className="btn-base btn-primary">Quero entender essa condição <ArrowRight size={16} aria-hidden="true" className="shrink-0" /></a>
          </div>
        </aside>
      </div>
    </section>
  );
}

const RISKS = [
  {
    icon: Search,
    text: "Não sabe por onde começar?",
    description:
      "Existem várias linhas de crédito, mas nem sempre é simples identificar qual se aplica à sua empresa e se ela é elegível.",
  },
  {
    icon: Coins,
    text: "Não sabe quanto pode financiar?",
    description:
      "Limites de financiamento, contrapartidas e garantias geram dúvidas antes mesmo de iniciar o processo.",
  },
  {
    icon: FileText,
    text: "Burocracia e falta de tempo",
    description:
      "O processo é longo e documental, com diversas exigências que demandam tempo da sua equipe.",
  },
  {
    icon: Users,
    text: "Equipe interna não domina o assunto",
    description:
      "Sem familiaridade com as linhas de crédito e com os procedimentos, a equipe interna pode ter dificuldade para avançar.",
  },
  {
    icon: RefreshCw,
    text: "Idas e vindas com o banco",
    description:
      "Pendências, informações incompletas e solicitações adicionais geram retrabalho e desgaste durante a análise.",
  },
  {
    icon: Clock,
    text: "O crédito não chega no tempo do negócio",
    description:
      "Quando a busca começa na urgência, o financiamento pode demorar mais do que o necessário, levando a empresa a recorrer a alternativas mais caras.",
  },
];

function Problem() {
  return (
    <section className="financing-challenges section-space" aria-labelledby="challenges-title">
      <div className="page-container challenges-layout">
        <div className="min-w-0">
          <p className="eyebrow challenges-eyebrow">O que pode dificultar a captação</p>
          <h2 id="challenges-title" className="challenges-title mt-5 font-extrabold">
            O financiamento da sua empresa não precisa ser um <span className="text-primary">processo complicado.</span>
          </h2>
          <p className="challenges-intro mt-4">
            Muitas empresas conhecem as oportunidades do Banco do Nordeste, mas encontram desafios que acabam atrasando seus projetos e consumindo o tempo da equipe.
          </p>
          <div className="challenges-grid mt-7">
            {RISKS.map(({ icon: Icon, text, description }) => (
              <article
                key={text}
                className="challenge-card"
              >
                <span
                  aria-hidden="true"
                  className="challenge-icon"
                >
                  <Icon size={30} className="text-primary" />
                </span>
                <h3>{text}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="challenges-visual">
          <img src="/financing-planning-team.webp" alt="" loading="lazy" width={960} height={1440} className="challenges-photo" />
          <div className="challenges-support">
            <span className="challenge-icon" aria-hidden="true"><TrendingUp size={38} /></span>
            <div>
              <h3>A Ekeep ajuda sua empresa a superar esses desafios.</h3>
              <p>Da identificação das linhas à condução do processo com o Banco do Nordeste, para que você avance com mais segurança e menos desgaste.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DIFFS = [
  {
    icon: Search,
    title: "A linha de crédito certa",
    text: "Identificamos as possibilidades de financiamento mais adequadas ao perfil da sua empresa e ao objetivo do projeto.",
  },
  {
    icon: Clock,
    title: "Planejamento no momento certo",
    text: "Antecipamos a preparação do processo para que sua empresa não dependa do crédito apenas na hora da urgência.",
  },
  {
    icon: ClipboardList,
    title: "Menos burocracia e retrabalho",
    text: "Orientamos a documentação e acompanhamos as exigências do processo para reduzir pendências e desgaste.",
  },
  {
    icon: MessageCircle,
    title: "Interlocução com o Banco do Nordeste",
    text: "Acompanhamos a comunicação com a instituição e ajudamos a dar mais clareza aos próximos passos da análise.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Sua equipe focada no negócio",
    text: "Enquanto a Ekeep conduz a estratégia de captação, sua empresa mantém o foco na operação e nos investimentos.",
  },
];

function Differentials() {
  return (
    <section id="diferenciais" className="bg-ink section-space text-background">
      <div className="page-container">
        <p className="eyebrow">Nossos diferenciais</p>
        <div className="mt-3 flex flex-col gap-4">
          <h2 className="max-w-lg section-title font-extrabold text-background">
            Por que contar com a Ekeep?
          </h2>
          <p className="text-sm text-background/70">
            Da identificação das oportunidades de financiamento à condução do processo junto ao Banco do Nordeste, a Ekeep ajuda sua empresa a avançar com mais planejamento, organização e segurança.
          </p>
        </div>
        <div className="differentials-grid mt-8 grid gap-4">
          {DIFFS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-background/10 bg-ink-soft p-5 differential-card"
            >
              <Icon size={24} aria-hidden="true" className="text-primary" />
              <h3 className="mt-3 text-base font-bold leading-snug text-background">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/75">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Entendimento inicial",
    text: "Conhecemos a necessidade, o perfil da empresa e os objetivos do financiamento.",
  },
  {
    title: "Avaliação de enquadramento",
    text: "Analisamos as linhas disponíveis e as condições aplicáveis ao porte, à atividade e à localização do projeto.",
  },
  {
    title: "Estratégia de captação",
    text: "Avaliamos valor pretendido, recursos próprios, garantias e prazo do negócio para orientar o planejamento.",
  },
  {
    title: "Preparação documental",
    text: "Apoiamos a organização das informações e dos documentos necessários à solicitação.",
  },
  {
    title: "Condução com o banco",
    text: "Fazemos a interlocução com o BNB e acompanhamos solicitações de informações e ajustes.",
  },
  {
    title: "Acompanhamento da análise",
    text: "Apoiamos a resolução de pendências e o entendimento das etapas até a decisão da instituição.",
  },
];

function Process() {
  return (
    <section id="processo" className="bg-background section-space">
      <div className="page-container">
        <p className="eyebrow">Nosso processo</p>
        <div className="mt-3 flex flex-col gap-3">
          <h2 className="section-title font-extrabold">Como funciona.</h2>
          <p className="text-sm text-muted-foreground">
            Um caminho estruturado para preparar a solicitação e acompanhar as etapas de análise do
            financiamento.
          </p>
        </div>
        <ol className="process-grid mt-8 grid gap-6">
          {STEPS.map(({ title, text }, i) => (
            <li key={title} className="flex gap-4">
              <div className="flex shrink-0 flex-col items-center">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-ink section-space">
      <ResponsiveImage
        asset="office-assets"
        src={stockImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />
      <div className="page-container contact-grid grid gap-8 items-start">
        <div>
          <p className="eyebrow">Fale com nosso time</p>
          <h2 className="mt-3 section-title font-extrabold text-background">
            Planeje o crédito para o{" "}
            <span className="text-primary">próximo passo da sua empresa.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/75">
            Conte seu objetivo de investimento. A Ekeep ajuda a avaliar as possibilidades de
            financiamento e a organizar os próximos passos com o BNB.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Atendimento consultivo e sem compromisso",
              "Análise da necessidade e do enquadramento",
              "Direcionamento para o WhatsApp após o envio",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-background/85">
                <MessageCircle size={16} className="shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Quais empresas podem contar com a Ekeep?",
    a: "A assessoria é voltada a médias e grandes empresas de diferentes segmentos. O acesso ao financiamento depende do enquadramento da empresa e do projeto nas regras de cada linha e na área de atuação do BNB.",
  },
  {
    q: "Como saber qual linha atende minha empresa?",
    a: "A Ekeep avalia a finalidade do crédito, o porte, a atividade e a localização do projeto para orientar a escolha entre as alternativas disponíveis.",
  },
  {
    q: "Quanto posso solicitar e quais garantias preciso oferecer?",
    a: "O valor financiável, os recursos próprios e as garantias variam conforme a linha, o porte, o projeto e a análise de crédito. A avaliação inicial ajuda a mapear essas condições.",
  },
  {
    q: "Quanto tempo leva para o crédito ser liberado?",
    a: "Não há um prazo único. A análise depende do cadastro, da documentação, do projeto e das exigências do banco. Por isso, recomendamos iniciar o relacionamento antes de o recurso se tornar urgente.",
  },
  {
    q: "A Ekeep garante a aprovação do financiamento?",
    a: "A Ekeep apoia a estratégia, a documentação e a interlocução com o banco. A aprovação, as condições e a liberação dos recursos são decisões exclusivas do Banco do Nordeste.",
  },
  {
    q: "Posso financiar um imóvel para sair do aluguel?",
    a: "Há modalidades para aquisição de imóvel empresarial, mas elas possuem critérios específicos de porte, faturamento e características do imóvel. A Ekeep avalia se essa finalidade pode ser enquadrada no seu caso.",
  },
  {
    q: "Empresas controladas por mulheres têm condições diferenciadas?",
    a: "Algumas linhas preveem benefícios para empresas controladas por mulheres ou com participação feminina superior a 40% do capital social. Percentuais, prazos e critérios dependem da linha e do porte; não se aplicam automaticamente a toda empresa.",
  },
  {
    q: "Como é feito o orçamento?",
    a: "O orçamento da assessoria considera o projeto, a necessidade de financiamento e a complexidade do acompanhamento. O primeiro passo é conversar com a Ekeep sobre o cenário da empresa.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background section-space">
      <div className="page-container faq-grid grid gap-8">
        <div className="faq-left">
          <div className="faq-intro">
            <p className="eyebrow">Perguntas frequentes</p>
            <h2 className="mt-3 section-title font-extrabold">Dúvidas frequentes.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Veja as respostas para as principais perguntas sobre nossos serviços.
            </p>
          </div>
          <div className="faq-support mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6">
            <h3 className="text-xl font-bold text-ink">Ainda ficou com alguma dúvida?</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Fale com a Ekeep sobre seu projeto e entenda as possibilidades de financiamento para
              sua empresa.
            </p>
            <a
              href={whatsappLink(
                "Olá, Ekeep! Gostaria de avaliar as possibilidades de financiamento no Banco do Nordeste para minha empresa.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base btn-primary mt-5 w-full"
            >
              Falar com um especialista{" "}
              <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
            </a>
            <ul className="mt-5 space-y-3">
              {["Atendimento consultivo", "Avaliação personalizada", "Sem compromisso inicial"].map(
                (benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-ink-soft">
                    <Check
                      size={16}
                      strokeWidth={3}
                      aria-hidden="true"
                      className="shrink-0 text-primary"
                    />
                    {benefit}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div className="faq-accordion self-start divide-y divide-border rounded-xl border border-border bg-card">
          {FAQ.map((item, i) => (
            <div key={item.q}>
              <button
                type="button"
                id={`faq-question-${i}`}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <span className="min-w-0 flex-1 text-sm font-semibold text-ink">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                hidden={open !== i}
              >
                <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-background">
      <div className="page-container footer-grid grid gap-x-6 gap-y-4">
        <div>
          <Logo dark />
        </div>
        <div className="space-y-3 text-sm text-background/80">
          <p className="flex items-center gap-3">
            <MessageCircle size={16} className="shrink-0 text-primary" /> +55 (71) 98194-8895
          </p>
          <p className="flex items-center gap-3">
            <Mail size={16} className="shrink-0 text-primary" /> contato@ekeepconsultores.com.br
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-background">Links rápidos</h3>
          <ul className="footer-links mt-1 grid grid-cols-2 gap-x-3">
            {HEADER_NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-background/70 hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-background">Siga a Ekeep</h3>
          <div className="mt-1 flex gap-3">
            {[Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                aria-label={["LinkedIn da Ekeep", "Instagram da Ekeep"][i]}
                className="grid h-11 w-11 place-items-center rounded-md border border-background/15 transition hover:border-primary hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <p className="bg-neutral-800 px-4 py-3 text-center text-xs leading-relaxed text-white/90">
          © {new Date().getFullYear()} Ekeep Consultores. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="landing min-h-screen bg-neutral-800">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Credentials />
        <Solutions />
        <Problem />
        <section className="bg-background section-space" aria-labelledby="planejamento-title">
          <div className="page-container">
            <p className="eyebrow">Antecipe o próximo passo</p>
            <h2 id="planejamento-title" className="mt-3 section-title font-extrabold">
              Busque o crédito antes de precisar dele.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
              O relacionamento com o banco, a preparação dos documentos e a análise de crédito levam
              tempo. Começar com antecedência ajuda a alinhar a captação ao planejamento do negócio
              e reduz a necessidade de recorrer, na urgência, a alternativas com juros mais altos.
            </p>
            <a href="#contato" className="btn-base btn-primary mt-6">
              Planejar minha captação <ArrowRight size={16} />
            </a>
          </div>
        </section>
        <Differentials />
        <Process />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <a
        href={whatsappLink(
          "Olá, Ekeep! Gostaria de falar sobre captação de financiamento no Banco do Nordeste.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="floating-whatsapp fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-whats text-background shadow-card transition hover:scale-105"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
