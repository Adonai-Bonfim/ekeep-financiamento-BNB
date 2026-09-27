import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  Box,
  Building2,
  Check,
  ChevronDown,
  ClipboardList,
  Headphones,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  ScanLine,
  Search,
  ShieldAlert,
  ShoppingCart,
  Sliders,
  TrendingDown,
  UploadCloud,
  X,
} from "lucide-react";

import { Logo } from "@/components/ekeep/Logo";
import { Credentials } from "@/components/ekeep/Credentials";
import { ResponsiveImage } from "@/components/ekeep/ResponsiveImage";
import { LeadForm, whatsappLink } from "@/components/ekeep/LeadForm";
import heroImg from "@/assets/hero-warehouse.jpg";
import officeImg from "@/assets/office-assets.jpg";
import stockImg from "@/assets/stock-operator.jpg";
import executiveImg from "@/assets/worried-executive.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ekeep Consultores | Inventário de Estoque e Imobilizado" },
      {
        name: "description",
        content:
          "A Ekeep realiza inventários de estoque e imobilizado para reduzir perdas, apoiar auditorias e dar controle real sobre o patrimônio da sua empresa.",
      },
      {
        property: "og:title",
        content: "Ekeep Consultores | Inventário de Estoque e Imobilizado",
      },
      {
        property: "og:description",
        content:
          "Mais de 20 anos transformando dados físicos em informação confiável para a gestão. Solicite um diagnóstico.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const NAV = [
  { label: "Serviços", href: "#solucoes" },
  { label: "Como Funciona", href: "#processo" },
  { label: "Benefícios", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
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
    <header className="site-header sticky top-0 z-50 border-b border-white/15 bg-black text-white">
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
          <Logo dark />
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
            {NAV.map((item) => (
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
            Solicitar Diagnóstico <ArrowRight size={16} />
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
          {NAV.map((item) => (
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
            Solicitar Diagnóstico
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
        asset="hero-warehouse"
        src={heroImg}
        alt="Operação de inventário em armazém"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-ink/60" />
      <div className="page-container hero-content">
        <h1 className="max-w-2xl hero-title font-extrabold text-background">
          Controle real sobre o <span className="text-primary">patrimônio e o estoque</span>{" "}
          <span className="block sm:inline">da sua empresa.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-background/75">
          A Ekeep realiza inventários para identificar divergências, reduzir perdas, apoiar
          auditorias e transformar dados físicos em informações confiáveis para a sua gestão.
        </p>
        <div className="hero-actions flex flex-wrap gap-3">
          <a href="#contato" className="btn-base btn-primary">
            Solicitar Diagnóstico <ArrowRight size={16} />
          </a>
          <a
            href={whatsappLink("Olá, Ekeep! Gostaria de falar sobre inventário.")}
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
    asset: "office-assets" as const,
    img: officeImg,
    alt: "Escritório com ativos patrimoniais",
    icon: Building2,
    title: "Inventário de Imobilizado",
    subtitle: "Mais controle, visibilidade e segurança sobre os bens da sua empresa.",
    items: [
      "Garantir controle dos bens da empresa",
      "Reduzir exposição a furtos e desvios",
      "Conhecer o estado de conservação e uso dos bens",
      "Evitar compras desnecessárias por falta de visibilidade",
      "Reduzir riscos de auditoria e divergências contábeis",
      "Atender requisitos normativos e fiscais",
      "Apoiar a apuração adequada da depreciação",
    ],
    segments:
      "fábricas, indústrias, condomínios empresariais, lojas, escritórios de prestadores de serviço e empresas de diferentes segmentos.",
  },
  {
    asset: "stock-operator" as const,
    img: stockImg,
    alt: "Operador conferindo itens no estoque",
    icon: Box,
    title: "Inventário de Estoque",
    subtitle: "Mais precisão e segurança para a gestão do seu estoque.",
    items: [
      "Redução de rupturas e perdas de vendas",
      "Menor exposição a furtos e desvios",
      "Mais segurança em auditorias",
      "Atendimento a requisitos normativos e fiscais",
      "Menos compras desnecessárias",
      "Posição de estoque mais confiável para decisões de compra",
    ],
    segments: "fábricas, indústrias e lojas de varejo.",
    segmentsLabel: "Indicado para:",
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
          <h2 className="section-title font-extrabold">Soluções para diferentes necessidades.</h2>
          <p className="text-sm text-muted-foreground">
            Inventários de estoque e imobilizado com metodologia, tecnologia e foco em resultados
            para a sua empresa.
          </p>
        </div>

        <div className="solutions-grid mt-8 grid gap-6">
          {SOLUTIONS.map(
            ({ asset, img, alt, icon: Icon, title, subtitle, items, segments, segmentsLabel }) => (
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
                  {segments && (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      <strong className="font-semibold text-ink-soft">
                        {segmentsLabel ?? "Indicado para:"}
                      </strong>{" "}
                      {segments}
                    </p>
                  )}
                  <a
                    href="#contato"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Solicitar diagnóstico <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

const RISKS = [
  {
    icon: ShoppingCart,
    text: "Compras desnecessárias",
    description:
      "A falta de visibilidade pode levar a novas compras de itens que já existem na empresa, gerando desperdício e aumento de custos.",
  },
  {
    icon: ClipboardList,
    text: "Divergências em auditorias",
    description:
      "Diferenças entre o físico e os registros podem comprometer auditorias, gerar retrabalho e expor fragilidades nos controles internos.",
  },
  {
    icon: BarChart3,
    text: "Perdas e desvios",
    description:
      "Sem monitoramento adequado, furtos, extravios e inconsistências podem passar despercebidos por mais tempo e ampliar o prejuízo.",
  },
  {
    icon: Box,
    text: "Falta de controle dos bens",
    description:
      "A empresa perde clareza sobre localização, uso e estado de conservação dos ativos, dificultando gestão, manutenção e planejamento.",
  },
  {
    icon: ShieldAlert,
    text: "Riscos fiscais e normativos",
    description:
      "Inconsistências em estoque e patrimônio podem afetar exigências contábeis, fiscais e normativas, aumentando a exposição a riscos.",
  },
  {
    icon: TrendingDown,
    text: "Decisões baseadas em dados incorretos",
    description:
      "Quando os números não refletem a realidade, compras, reposições, investimentos e decisões gerenciais passam a ser feitas com menos segurança.",
  },
];

function Problem() {
  return (
    <section className="bg-surface section-space">
      <div className="page-container risks-layout">
        <div className="min-w-0">
          <p className="eyebrow">Principais riscos</p>
          <h2 className="mt-3 max-w-2xl section-title font-extrabold">
            O que uma gestão sem visibilidade pode causar?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            A falta de controle sobre estoque e patrimônio pode gerar impactos operacionais,
            financeiros e contábeis.
          </p>
          <div className="risks-grid mt-8 grid gap-4">
            {RISKS.map(({ icon: Icon, text, description }) => (
              <article
                key={text}
                className="flex flex-col items-start gap-3 rounded-lg border border-border bg-card p-5 shadow-soft"
              >
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-accent"
                >
                  <Icon size={18} className="text-primary" />
                </span>
                <h3 className="text-base font-semibold leading-snug text-ink">{text}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="risks-visual">
          <ResponsiveImage
            asset="worried-executive"
            sizes="(min-width: 80rem) 23rem, 30vw"
            src={executiveImg}
            alt="Executivo analisando dados"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
          />
        </div>
      </div>
    </section>
  );
}

const DIFFS = [
  {
    icon: Award,
    title: "Mais de 20 anos de experiência",
    text: "Sócios e profissionais capacitados, com atuação em projetos de diferentes portes, segmentos e níveis de complexidade.",
  },
  {
    icon: ClipboardList,
    title: "Planejamento e pré-inventário",
    text: "Apoio na definição do escopo, cronograma, metodologia e preparação da operação para uma execução mais organizada e segura.",
  },
  {
    icon: BarChart3,
    title: "Visão de controladoria e finanças",
    text: "Os resultados são analisados considerando seus impactos na controladoria, nas finanças e no atendimento às normas contábeis.",
  },
  {
    icon: BadgeCheck,
    title: "Relatório executivo de resultados",
    text: "As informações são consolidadas de forma clara para facilitar a análise de divergências e apoiar a tomada de decisão.",
  },
  {
    icon: Headphones,
    title: "Suporte até a integração",
    text: "A Ekeep acompanha o processo até a efetiva integração dos dados do inventário ao sistema do cliente.",
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
            Da preparação do inventário à integração dos resultados, a Ekeep acompanha cada etapa
            com experiência, planejamento e visão de negócio.
          </p>
        </div>
        <div className="differentials-grid mt-8 grid gap-4">
          {DIFFS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-xl border border-background/10 bg-ink-soft p-5 transition hover:border-primary/50 differential-card"
            >
              <Icon size={24} aria-hidden="true" className="text-primary" />
              <h3 className="mt-4 text-base font-bold text-background">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-background/65">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: ClipboardList,
    title: "Planejamento",
    text: "Entendimento da operação, definição do escopo e organização do cronograma para uma execução alinhada à realidade da empresa.",
  },
  {
    icon: ScanLine,
    title: "Levantamento físico",
    text: "Contagem e identificação dos itens com metodologia adequada, tecnologia de apoio e equipe especializada.",
  },
  {
    icon: Search,
    title: "Conciliação e análise",
    text: "Cruzamento das informações levantadas com os registros existentes para identificar divergências e gerar visão crítica dos dados.",
  },
  {
    icon: Sliders,
    title: "Tratamento das divergências",
    text: "Classificação, investigação e ajustes das inconsistências encontradas, em conjunto com a equipe do cliente.",
  },
  {
    icon: BadgeCheck,
    title: "Relatório executivo",
    text: "Apresentação dos principais resultados, com informações organizadas para análise gerencial e tomada de decisão.",
  },
  {
    icon: UploadCloud,
    title: "Integração dos dados",
    text: "Suporte até a efetiva carga das informações no sistema do cliente, garantindo continuidade e aproveitamento dos resultados.",
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
            Um processo estruturado para transformar inventários em informações confiáveis, com
            clareza em cada etapa e foco em resultado.
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

const TESTIMONIALS = [
  {
    quote:
      "A Ekeep trouxe mais organização e segurança para o nosso patrimônio. O processo foi bem conduzido e os relatórios nos deram uma visão clara da nossa realidade.",
    name: "Juliana Martins",
    role: "Gerente Administrativa",
    company: "Grupo Boticário",
  },
  {
    quote:
      "O inventário de estoque nos ajudou a reduzir perdas, melhorar o controle e deu muito mais confiabilidade para as nossas auditorias.",
    name: "Carlos Menezes",
    role: "Diretor Financeiro",
    company: "ambev",
  },
  {
    quote:
      "Equipe técnica, comprometida e parceira. Conseguimos integrar os dados rapidamente ao nosso ERP e hoje temos informações muito mais confiáveis para a gestão.",
    name: "Ricardo Almeida",
    role: "CFO",
    company: "São Martinho",
  },
];

function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<Animation | null>(null);
  const pauseRef = useRef(false);
  const [paused, setPaused] = useState(false);
  pauseRef.current = paused;
  useEffect(() => {
    const viewport = trackRef.current;
    const track = viewport?.querySelector<HTMLElement>(".testimonial-track");
    if (!viewport || !track) return;
    const mobile = window.matchMedia("(width < 40rem)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let duration = 1;
    const syncPlayback = () => {
      const motion = motionRef.current;
      if (!motion) return;
      if (pauseRef.current || !visible || document.hidden) motion.pause();
      else motion.play();
    };
    const rebuild = () => {
      const previous = motionRef.current;
      const progress = previous ? (Number(previous.currentTime ?? 0) % duration) / duration : 0;
      previous?.cancel();
      motionRef.current = null;
      if (!mobile.matches || reducedMotion.matches) return;
      const duplicate = track.children[TESTIMONIALS.length] as HTMLElement | undefined;
      const distance = duplicate?.offsetLeft ?? 0;
      if (!distance) return;
      // Translate fractional pixels on the compositor, instead of rounding
      // scrollLeft on every frame. Matching copies make the loop seamless.
      duration = (distance / 12) * 1000;
      const motion = track.animate(
        [{ transform: "translate3d(0, 0, 0)" }, { transform: `translate3d(-${distance}px, 0, 0)` }],
        { duration, iterations: Infinity, easing: "linear" },
      );
      motion.currentTime = progress * duration;
      motionRef.current = motion;
      syncPlayback();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      syncPlayback();
    });
    const resize = new ResizeObserver(rebuild);
    observer.observe(viewport);
    resize.observe(viewport);
    mobile.addEventListener("change", rebuild);
    reducedMotion.addEventListener("change", rebuild);
    document.addEventListener("visibilitychange", syncPlayback);
    rebuild();
    return () => {
      motionRef.current?.cancel();
      motionRef.current = null;
      observer.disconnect();
      resize.disconnect();
      mobile.removeEventListener("change", rebuild);
      reducedMotion.removeEventListener("change", rebuild);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);
  useEffect(() => {
    if (paused) motionRef.current?.pause();
    else if (!document.hidden) motionRef.current?.play();
  }, [paused]);
  return (
    <section id="depoimentos" className="bg-surface section-space">
      <div className="page-container">
        <p className="eyebrow">Depoimentos</p>
        <div className="mt-3 flex flex-col gap-3">
          <h2 className="section-title font-extrabold">Feedback de clientes.</h2>
          <p className="text-sm text-muted-foreground">
            Empresas que confiam na Ekeep para manter seus dados patrimoniais e de estoque mais
            seguros e confiáveis.
          </p>
        </div>
        <div
          ref={trackRef}
          className="testimonial-grid mt-8"
          role="region"
          aria-label="Depoimentos de clientes"
          tabIndex={0}
          onPointerDown={() => setPaused(true)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={() => setPaused(true)}
        >
          <div className="testimonial-track grid gap-5">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                aria-hidden={i >= TESTIMONIALS.length ? true : undefined}
                className={`min-w-0 rounded-xl border border-border bg-card p-5 shadow-soft ${i >= TESTIMONIALS.length ? "testimonial-copy" : ""}`}
              >
                <blockquote className="text-sm leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-ink">{t.name}</span>
                    <span className="block text-sm text-muted-foreground">{t.role}</span>
                  </span>
                  <span className="w-full font-display text-sm font-extrabold text-ink-soft">
                    {t.company}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="relative isolate overflow-hidden bg-ink section-space">
      <ResponsiveImage
        asset="stock-operator"
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
            Solicite uma avaliação do seu <span className="text-primary">cenário.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/75">
            Conte com a experiência da Ekeep para entender suas necessidades e indicar a melhor
            solução para a sua empresa.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Atendimento consultivo e sem compromisso",
              "Resposta rápida",
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
    q: "Qual o prazo médio para a realização do inventário?",
    a: "Depende do volume de itens, número de unidades e complexidade da operação. Após o diagnóstico inicial, a Ekeep estrutura o cronograma conforme o cenário do cliente.",
  },
  {
    q: "A empresa precisa parar a operação durante o inventário?",
    a: "A metodologia é definida de acordo com a realidade de cada operação, buscando reduzir impactos no funcionamento da empresa sempre que possível.",
  },
  {
    q: "Quais empresas podem contratar o serviço?",
    a: "A Ekeep atende fábricas, indústrias, condomínios empresariais, lojas, varejo, escritórios e empresas de diferentes segmentos.",
  },
  {
    q: "Qual a diferença entre Inventário de Estoque e Inventário de Imobilizado?",
    a: "O Inventário de Estoque verifica itens destinados à operação ou venda. Já o Inventário de Imobilizado é voltado aos bens patrimoniais da empresa, como máquinas, equipamentos, mobiliário e outros ativos.",
  },
  {
    q: "O inventário pode ser comparado com os dados do sistema?",
    a: "Sim. Conforme o escopo contratado, os dados físicos podem ser confrontados com os registros existentes para identificação de divergências.",
  },
  {
    q: "É possível integrar os resultados ao nosso ERP?",
    a: "Sim. A Ekeep oferece suporte até a efetiva integração dos dados resultantes do inventário ao sistema do cliente, conforme o projeto.",
  },
  {
    q: "O serviço ajuda em processos de auditoria?",
    a: "Sim. O inventário contribui para identificar divergências entre registros físicos, sistemas e informações contábeis, apoiando a preparação para auditorias.",
  },
  {
    q: "Como é feito o orçamento?",
    a: "O valor depende de fatores como quantidade de itens, número de unidades, localização, tipo de inventário e complexidade da operação. O primeiro passo é avaliar o cenário da empresa.",
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
              Fale com um especialista da Ekeep e entenda qual formato de inventário faz mais
              sentido para a sua operação.
            </p>
            <a
              href={whatsappLink(
                "Olá, Ekeep! Gostaria de falar com um especialista para entender qual formato de inventário faz mais sentido para a minha operação.",
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
          <p className="mt-2 text-sm text-background/65">
            Mais que inventários, informações para melhores decisões.
          </p>
        </div>
        <div className="space-y-3 text-sm text-background/80">
          <p className="flex items-center gap-3">
            <MessageCircle size={16} className="shrink-0 text-primary" /> +55 (71) 98194-8895
          </p>
          <p className="flex items-center gap-3">
            <Mail size={16} className="shrink-0 text-primary" /> contato@ekeep.com.br
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-background">Links rápidos</h3>
          <ul className="footer-links mt-1 grid grid-cols-2 gap-x-3">
            {NAV.map((item) => (
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
      <div className="page-container mt-4">
        <p className="text-center text-xs text-background/50">
          © {new Date().getFullYear()} Ekeep Consultores. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="landing min-h-screen bg-black">
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <Credentials />
        <Solutions />
        <Problem />
        <Differentials />
        <Process />
        <Testimonials />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <a
        href={whatsappLink("Olá, Ekeep! Gostaria de falar sobre inventário.")}
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
