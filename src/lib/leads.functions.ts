import { createServerFn } from "@tanstack/react-start";
import { leadSchema } from "./lead-schema";

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: false as const };
    try {
      const { storeLead } = await import("./lead-storage.server");
      await storeLead(data);
      return { ok: true as const };
    } catch {
      // Do not log lead data, Google responses or credentials.
      console.error("Não foi possível confirmar o registro do contato no Google Sheets.");
      return { ok: false as const };
    }
  });
