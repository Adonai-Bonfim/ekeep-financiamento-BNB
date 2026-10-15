export type ContactLocation =
  "hero" | "header" | "section" | "faq" | "footer" | "final_cta" | "floating_button";
type Events = {
  cta_solicitar_contato_click: undefined;
  cta_ir_para_formulario_click: { cta_location: ContactLocation };
  form_start: undefined;
  form_submit_error: { error_type: "validation" };
  whatsapp_click: { source: ContactLocation | "form_success" };
};

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Only allowlisted values are copied; form values and destinations never enter the queue.
export function trackEvent<E extends keyof Events>(
  event: E,
  ...args: Events[E] extends undefined ? [] : [Events[E]]
) {
  if (typeof window === "undefined") return;
  try {
    const params = args[0];
    const source = params && "source" in params ? params.source : undefined;
    const formEvent = event !== "whatsapp_click" || source === "form_success";
    const payload = {
      event,
      page_type: "landing_page_captacao_recursos",
      ...(formEvent ? { form_name: "captacao_recursos_ekeep" } : {}),
      ...(source ? { source } : {}),
      ...(params && "cta_location" in params ? { cta_location: params.cta_location } : {}),
      ...(event === "form_submit_error" ? { error_type: "validation" } : {}),
    };
    window.dataLayer ??= [];
    window.dataLayer.push(payload);
  } catch {
    // Analytics must never prevent the synchronous contact action.
  }
}

const startedDocuments = new WeakSet<Document>();
export function trackFormStart(document: Document) {
  if (startedDocuments.has(document)) return;
  startedDocuments.add(document);
  trackEvent("form_start");
}
