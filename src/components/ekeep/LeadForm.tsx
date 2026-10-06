import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { leadSchema } from "@/lib/lead-schema";

export const WHATSAPP_NUMBER = "5571981948895";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Lead = {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  cidade: string;
  servico: string;
  necessidade: string;
};

const EMPTY: Lead = {
  nome: "",
  empresa: "",
  email: "",
  whatsapp: "",
  cidade: "",
  servico: "",
  necessidade: "",
};

const inputClass =
  "min-h-11 min-w-0 w-full rounded-md border border-border bg-background px-3 py-2.5 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const labelClass = "mb-1.5 block text-sm font-semibold text-ink-soft";

export function LeadForm() {
  const [lead, setLead] = useState<Lead>(EMPTY);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (key: keyof Lead) => (e: { target: { value: string } }) =>
    setLead((prev) => ({ ...prev, [key]: e.target.value }));

  const message = [
    "Olá, Ekeep! Gostaria de avaliar a captação de financiamento no Banco do Nordeste.",
    lead.nome && `Nome: ${lead.nome}`,
    lead.empresa && `Empresa: ${lead.empresa}`,
    lead.email && `E-mail: ${lead.email}`,
    lead.whatsapp && `WhatsApp: ${lead.whatsapp}`,
    lead.cidade && `Cidade/Estado: ${lead.cidade}`,
    lead.servico && `Finalidade do financiamento: ${lead.servico}`,
    lead.necessidade && `Necessidade: ${lead.necessidade}`,
  ]
    .filter(Boolean)
    .join("\n");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const parsed = leadSchema.safeParse(lead);
    if (!parsed.success) {
      setError("Confira os campos obrigatórios e informe o WhatsApp com DDD.");
      return;
    }
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="lead-form min-w-0 rounded-xl bg-card shadow-card"
      id="formulario"
    >
      <div className="grid min-w-0 gap-5">
        <fieldset className="lead-fields grid min-w-0 gap-4">
          <legend className="sr-only">Dados para solicitar contato</legend>
          <div>
            <label className={labelClass} htmlFor="nome">
              Nome <span className="text-primary">*</span>
            </label>
            <input
              id="nome"
              autoComplete="name"
              required
              maxLength={100}
              value={lead.nome}
              onChange={set("nome")}
              placeholder="Seu nome completo"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="empresa">
              Empresa <span className="text-primary">*</span>
            </label>
            <input
              id="empresa"
              autoComplete="organization"
              required
              maxLength={100}
              value={lead.empresa}
              onChange={set("empresa")}
              placeholder="Nome da sua empresa"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="email">
              E-mail <span className="text-primary">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              maxLength={255}
              value={lead.email}
              onChange={set("email")}
              placeholder="seu@email.com"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="whats">
              WhatsApp <span className="text-primary">*</span>
            </label>
            <input
              id="whats"
              type="tel"
              autoComplete="tel"
              required
              maxLength={20}
              value={lead.whatsapp}
              onChange={set("whatsapp")}
              placeholder="(71) 91234-5678"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="cidade">
              Cidade/Estado <span className="text-primary">*</span>
            </label>
            <input
              id="cidade"
              autoComplete="address-level2"
              required
              maxLength={80}
              value={lead.cidade}
              onChange={set("cidade")}
              placeholder="Ex.: Salvador/BA"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="servico">
              Finalidade do financiamento <span className="text-primary">*</span>
            </label>
            <select
              id="servico"
              required
              value={lead.servico}
              onChange={set("servico")}
              className={inputClass}
            >
              <option value="">Selecione uma opção</option>
              <option>Capital de giro</option>
              <option>Aquisição de imóvel empresarial</option>
              <option>Máquinas e equipamentos</option>
              <option>Construção, reformas e ampliação</option>
              <option>Saúde</option>
              <option>Software</option>
              <option>Energia solar e sustentabilidade</option>
              <option>Inovação</option>
              <option>Turismo</option>
              <option>Agronegócio</option>
              <option>Ainda não sei</option>
            </select>
          </div>
          <div className="lead-message">
            <label className={labelClass} htmlFor="necessidade">
              Conte brevemente sua necessidade
            </label>
            <textarea
              id="necessidade"
              rows={3}
              maxLength={1000}
              value={lead.necessidade}
              onChange={set("necessidade")}
              placeholder="Conte seu projeto, o valor estimado e quando precisa dos recursos..."
              className={inputClass}
            />
          </div>
        </fieldset>

        <div className="lead-actions grid min-w-0 gap-3">
          <button type="submit" className="lead-message btn-base btn-primary w-full">
            Solicitar contato <ArrowRight size={16} />
          </button>
          <p className="lead-message text-sm leading-relaxed text-muted-foreground">
            Ao solicitar contato, o WhatsApp abrirá com os dados preenchidos. Confirme o envio da
            mensagem para falar com um especialista da Ekeep.
          </p>
          {error && (
            <p role="alert" className="lead-message text-sm leading-relaxed text-red-700">
              {error}
            </p>
          )}
          {sent && (
            <p
              role="status"
              className="lead-message flex items-start gap-2 rounded-md bg-accent p-3 text-sm font-medium text-ink"
            >
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
              Mensagem preparada. Confirme o envio no WhatsApp. Se ele não abrir, permita pop-ups e
              toque novamente em “Solicitar contato”.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
