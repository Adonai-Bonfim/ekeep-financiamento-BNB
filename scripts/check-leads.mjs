import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import { leadSchema } from "../src/lib/lead-schema.ts";
import { storeLead } from "../src/lib/lead-storage.server.ts";

const lead = { nome: "Teste", empresa: "=1+1", email: "teste@example.com", whatsapp: "(71) 91234-5678", cidade: "Salvador/BA", servico: "Inventário de Estoque", necessidade: "Teste de integração", website: "" };
const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });

test("valida campos obrigatórios, telefone", () => {
  assert.equal(leadSchema.safeParse(lead).success, true);
  for (const invalid of [{ nome: " " }, { email: "inválido" }, { whatsapp: "123" }, { servico: "Outro" }, { necessidade: "a".repeat(1001) }]) {
    assert.equal(leadSchema.safeParse({ ...lead, ...invalid }).success, false);
  }
});

test("grava uma linha RAW, verifica assinatura e registra apenas os sete campos", async () => {
  process.env.GOOGLE_SHEETS_ID = "test-sheet";
  process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL = "test@example.com";
  process.env.GOOGLE_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" });
  for (const necessidade of ["", lead.necessidade]) {
    let calls = 0;
    const mock = async (url, options) => {
      calls++;
      if (calls === 1) {
        assert.equal(url, "https://oauth2.googleapis.com/token");
        const [header, body, signature] = options.body.get("assertion").split(".");
        assert.equal(verify("RSA-SHA256", Buffer.from(`${header}.${body}`), publicKey, Buffer.from(signature, "base64url")), true);
        return Response.json({ access_token: "fake-token" });
      }
      assert.match(url, /valueInputOption=RAW/);
      const row = JSON.parse(options.body).values[0];
      assert.match(decodeURIComponent(url), /!A:G:append/);
      assert.deepEqual(row, [lead.nome, lead.empresa, lead.email, lead.whatsapp, lead.cidade, lead.servico, necessidade]);
      return Response.json({ updates: { updatedRows: 1 } });
    };
    assert.ok(await storeLead({ ...lead, necessidade }, mock));
    assert.equal(calls, 2);
  }
});

test("não confirma sucesso sem configuração ou diante de falha do Google", async () => {
  delete process.env.GOOGLE_SHEETS_ID;
  await assert.rejects(storeLead(lead), /LEADS_NOT_CONFIGURED/);
  process.env.GOOGLE_SHEETS_ID = "test-sheet";
  await assert.rejects(storeLead(lead, async () => new Response(null, { status: 403 })), /LEADS_AUTH_FAILED/);
  for (const result of [new Response(null, { status: 503 }), Response.json({})]) {
    let calls = 0;
    await assert.rejects(storeLead(lead, async () => ++calls === 1 ? Response.json({ access_token: "test" }) : result), /LEADS_WRITE/);
  }
});
