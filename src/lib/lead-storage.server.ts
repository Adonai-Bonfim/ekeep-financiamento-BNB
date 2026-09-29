import { sign } from "node:crypto";
import { type LeadSubmission } from "./lead-schema.ts";

const TOKEN_URL = "https://oauth2.googleapis.com/token";

// Server-only credentials. Never use VITE_ prefixes for these variables.
export async function storeLead(lead: LeadSubmission, request: typeof fetch = fetch) {
  const sheetId = process.env["GOOGLE_SHEETS_ID"];
  const email = process.env["GOOGLE_SERVICE_ACCOUNT_EMAIL"];
  const key = process.env["GOOGLE_PRIVATE_KEY"]?.replace(/\\n/g, "\n");
  const tab = process.env["GOOGLE_SHEETS_TAB"] || "Leads";
  if (!sheetId || !email || !key) throw new Error("LEADS_NOT_CONFIGURED");

  const now = Math.floor(Date.now() / 1000);
  const encode = (value: unknown) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const unsigned = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  })}`;
  const assertion = `${unsigned}.${sign("RSA-SHA256", Buffer.from(unsigned), key).toString("base64url")}`;
  const tokenResponse = await request(TOKEN_URL, {
    method: "POST",
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    signal: AbortSignal.timeout(8000),
  });
  if (!tokenResponse.ok) throw new Error("LEADS_AUTH_FAILED");
  const token = await tokenResponse.json() as { access_token?: string };
  if (!token.access_token) throw new Error("LEADS_AUTH_FAILED");

  const range = `'${tab.replace(/'/g, "''")}'!A:G`;
  const response = await request(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token.access_token}`, "Content-Type": "application/json" },
      // RAW prevents submitted text from becoming executable spreadsheet formulas.
      body: JSON.stringify({ values: [[
        lead.nome, lead.empresa, lead.email, lead.whatsapp,
        lead.cidade, lead.servico, lead.necessidade,
      ]] }),
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok) throw new Error("LEADS_WRITE_FAILED");
  const result = await response.json() as { updates?: { updatedRows?: number } };
  if (result.updates?.updatedRows !== 1) throw new Error("LEADS_WRITE_UNCONFIRMED");
  return true;
}
