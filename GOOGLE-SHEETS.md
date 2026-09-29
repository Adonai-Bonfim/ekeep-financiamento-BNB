# Contatos do formulário no Google Sheets

A integração só fica ativa após configurar a planilha e as quatro variáveis abaixo. Não há salvamento apenas por preencher campos: o visitante precisa enviar o formulário. Cliques diretos no WhatsApp não são registrados.

## Preparação

1. Crie uma planilha privada na conta Google da Ekeep e uma aba chamada `Leads`.
2. Cole esta linha na célula A1 (as colunas estão separadas por tabulação):

```text
Nome	Empresa	E-mail	WhatsApp	Cidade/Estado	Servi?o de interesse	Necessidade
```

3. Em um projeto do Google Cloud, habilite a Google Sheets API, crie uma conta de serviço e gere uma chave JSON. Não é necessário conceder permissões administrativas no projeto.
4. Compartilhe somente essa planilha como **Editor** com o endereço `client_email` da conta de serviço. Não torne a planilha pública.
5. Na Vercel, configure as variáveis de ambiente do projeto:

| Variável | Valor |
| --- | --- |
| `GOOGLE_SHEETS_ID` | Trecho entre `/d/` e `/edit` no link da planilha |
| `GOOGLE_SHEETS_TAB` | `Leads` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Campo `client_email` da chave JSON |
| `GOOGLE_PRIVATE_KEY` | Campo `private_key` da chave JSON, incluindo BEGIN/END PRIVATE KEY |

A chave aceita quebras reais de linha ou `\n`. Configure Production; para Preview, prefira uma planilha separada de testes. Não use prefixo `VITE_`, não envie a chave por chat e não a coloque no Git. Para desenvolvimento, use `.env.local` com as mesmas variáveis e reinicie o servidor. `.env.example` contém apenas nomes vazios.

6. Faça um novo deploy depois de definir as variáveis. Envie um contato fictício e confirme a linha na planilha. Até essa verificação, o armazenamento em produção não está validado.

## Comportamento

S?o gravados somente os sete campos do formul?rio, nas colunas A a G. A integra??o n?o registra autoriza??o de marketing nem envia campanhas. Se a aba de teste tiver os cabe?alhos antigos, prepare uma aba vazia com os sete cabe?alhos acima antes de enviar novos testes.

- O servidor valida campos e só confirma sucesso após o Google confirmar a gravação de uma linha.
- A conexão usa a API oficial, autenticação no servidor e escrita `RAW` para que o conteúdo enviado não vire fórmula. Não há credenciais no navegador.
- Durante o envio, o botão fica desabilitado. Uma falha conserva os dados e não exibe sucesso. O WhatsApp continua disponível por ação do visitante.
- Não há fila durável nem garantia de entrega durante indisponibilidade do Google. Se a gravação ocorrer e a resposta se perder, reenviar pode gerar duplicata; confira e-mail/telefone antes de campanhas.
- Há proteção CSRF do TanStack e um campo antispam oculto. Para tráfego público, configure limites de requisições no WAF da Vercel conforme o volume; o campo oculto não impede bots sofisticados.

## Verificação

```sh
node --experimental-strip-types --test scripts/check-leads.mjs
npm run typecheck
npm run build
```

Os testes usam respostas simuladas; não gravam dados no Google. A validação final exige um envio real na planilha configurada.

Referências: [autenticação com conta de serviço](https://developers.google.com/identity/protocols/oauth2/service-account), [gravação de linhas](https://developers.google.com/workspace/sheets/api/reference/rest/v4/spreadsheets.values/append).
