# Ekeep — Captação de Financiamento Banco do Nordeste

Landing page da **Ekeep Consultores** para apresentar a assessoria na captação de financiamento junto ao Banco do Nordeste (BNB), voltada a médias e grandes empresas de diferentes segmentos.

O site explica as possibilidades de crédito, as dificuldades da captação e como a Ekeep apoia o planejamento, a identificação de linhas e a condução documental. O contato comercial acontece pelo WhatsApp. A aprovação e as condições de financiamento dependem da análise do banco.

## Como o site funciona

- Cabeçalho com logo transparente, link **Home** para o site institucional e navegação pelas seções. No celular, a navegação usa menu expansível.
- Abertura com chamada para antecipar o financiamento, foto de reunião empresarial e botões para contato.
- Cards com finalidades de financiamento: capital de giro, software, máquinas, imóveis, obras e investimentos em saúde, turismo, agronegócio, inovação e energia.
- Banner sobre possibilidades de condições diferenciadas para empresas lideradas por mulheres, conforme os critérios do BNB.
- Seção com seis dificuldades comuns da captação. O painel fotográfico lateral aparece somente em telas a partir de 1200 px.
- Cinco diferenciais da Ekeep e apresentação das etapas do acompanhamento.
- Formulário de contato, perguntas frequentes e rodapé com contatos e links rápidos.
- Botão flutuante de WhatsApp disponível durante a navegação.

A versão atual não possui seção de depoimentos.

## Formulário e WhatsApp

O formulário solicita nome, empresa, e-mail, WhatsApp com DDD, cidade/estado e finalidade do financiamento. O visitante também pode descrever sua necessidade.

Os dados são validados no navegador com Zod. Após a validação, o formulário abre o WhatsApp com uma mensagem contendo as informações preenchidas. **O visitante precisa confirmar o envio no WhatsApp.** Abrir a conversa não significa que a mensagem já foi enviada.

Não há armazenamento de leads em banco de dados, planilha ou CRM, nem envio automático de e-mail. O número de destino está na constante `WHATSAPP_NUMBER` em `src/components/ekeep/LeadForm.tsx`.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 e TypeScript | Componentes e tipagem |
| TanStack Start e Router | Renderização no servidor e roteamento |
| Vite 8 e Nitro | Desenvolvimento e build para hospedagem |
| Tailwind CSS 4 | Identidade visual e responsividade |
| Zod | Validação dos dados do formulário |
| Lucide React e Radix UI | Ícones e componentes de interface |
| Sharp | Otimização de imagens |
| Playwright | Testes de layout e interações no navegador |

Use npm e o `package-lock.json` versionado. O React Start está fixado em `1.168.60`, com `start-server-core` corrigido em `1.169.39` no lockfile.

## Execução local

Requisitos: Node.js 24, npm e Microsoft Edge para os testes de navegador na configuração padrão.

```sh
npm ci
npm run dev
```

Acesse `http://localhost:5173`. O servidor aceita conexões da rede local e atualiza o site automaticamente quando o código muda. Em outro dispositivo na mesma rede, use `http://<IP-do-computador>:5173`.

A porta 5173 é exclusiva. Para escolher outra:

```sh
npm run dev -- --port 5174
```

No PowerShell, use `npm.cmd` no lugar de `npm` caso a política de execução bloqueie `npm.ps1`. A execução local não exige banco de dados ou credenciais de API.

## Comandos

| Comando | Função |
| --- | --- |
| `npm run dev` | Desenvolvimento com atualização automática |
| `npm run typecheck` | Verificação de TypeScript |
| `npm run build` | Build de produção |
| `npm run build:dev` | Build em modo de desenvolvimento |
| `npm run preview` | Prévia do build, conforme o preset de hospedagem |
| `npm run lint` | Análise estática |
| `npm run format` | Formatação dos arquivos |
| `npm run test:responsive` | Verificação de layout e interações |
| `npm run images:optimize` | Geração de variantes das imagens legadas listadas no script |

O script `npm start` requer uma saída Node em `.output/server/index.mjs`; ele não serve os builds atuais de Cloudflare Pages ou Vercel.

## Onde editar

| Conteúdo ou configuração | Arquivo |
| --- | --- |
| Textos, finalidades, diferenciais, etapas, FAQ, menu e rodapé | `src/routes/index.tsx` |
| Formulário e mensagem de WhatsApp | `src/components/ekeep/LeadForm.tsx` |
| Regras e opções aceitas pelo formulário | `src/lib/lead-schema.ts` |
| Cards de credenciais | `src/components/ekeep/Credentials.tsx` |
| Logo do cabeçalho | `src/components/ekeep/HeaderLogo.tsx` |
| Logo do rodapé | `src/components/ekeep/Logo.tsx` |
| Cores, tipografia, enquadramento das fotos e responsividade | `src/styles.css` |
| Imagens adaptativas | `src/components/ekeep/ResponsiveImage.tsx` e `src/assets/responsive/` |
| Foto do banner de mulheres e painel de dificuldades | `public/businesswoman-financing.webp` e `public/financing-planning-team.webp` |
| Favicon | `public/favicon-financing.png` e sua referência em `src/routes/__root.tsx` |
| SEO da landing page | `src/lib/seo.ts` |
| Documento HTML e tratamento de erros | `src/routes/__root.tsx` |
| Preset de hospedagem e servidor local | `vite.config.ts` |
| Especificações visuais de referência | `docs/` |

Ao mudar as opções de financiamento, atualize tanto o formulário quanto o schema. Ao trocar fotografias, mantenha também as variantes WebP correspondentes. O script `images:optimize` ainda lista as imagens do projeto original; as novas imagens `hero-financing`, `financing-meeting` e `solar-engineer` precisam ser incluídas nele antes de usar esse comando para regenerá-las.

`src/routeTree.gen.ts` é gerado automaticamente. Os documentos em `docs/` registram referências de design; alterações posteriores solicitadas no site podem divergir dessas especificações.

## SEO e domínio

Defina `VITE_SITE_URL` com a URL pública definitiva, por exemplo `https://seu-dominio.com.br/`, antes do build. Essa variável configura a URL canônica, `og:url` e a URL nos dados estruturados. Sem ela, esses campos de URL são omitidos.

O título, a descrição e os dados estruturados descrevem a assessoria de financiamento da Ekeep. `public/robots.txt` permite indexação. Não há sitemap versionado para o novo domínio; o sitemap antigo de inventário foi removido.

Não versione arquivos `.env` ou credenciais. Uma mudança em variável `VITE_*` exige novo build para refletir no site.

## Validação

```sh
npm run typecheck
npm run build
```

Com o servidor de desenvolvimento ativo, execute em outro terminal:

```sh
npm run test:responsive
```

Os testes cobrem 17 larguras de 192 a 3440 px, overflow, áreas de toque, sobreposição entre cards e foto, menu, FAQ, campos obrigatórios e mensagem de financiamento preparada para o WhatsApp. O teste intercepta a abertura do WhatsApp e não envia mensagens.

Variáveis opcionais: `TEST_URL` para outro endereço de teste e `PLAYWRIGHT_CHANNEL` para outro canal de navegador instalado. Relatórios e capturas ficam em `artifacts/`, ignorado pelo Git.

O script legado `check-brand-carousel.mjs` verifica depoimentos do projeto original e não deve ser usado como validação desta landing page, pois a seção foi removida.

## Publicação na Vercel

Repositório: [Adonai-Bonfim/ekeep-financiamento-BNB](https://github.com/Adonai-Bonfim/ekeep-financiamento-BNB). Branch de produção: `main`.

O arquivo `vercel.json` identifica o framework como `tanstack-start`. Quando a variável de ambiente `VERCEL` está definida pela plataforma, `vite.config.ts` usa o preset Nitro `vercel`, gerando a saída em `.vercel/output/`.

Na configuração do projeto, use a raiz do repositório, instalação com `npm ci` e build com `npm run build`. Configure `VITE_SITE_URL` com o domínio definitivo. A pasta `.vercel/` é um artefato local e não deve ser versionada.

Para validar localmente o build da Vercel no PowerShell:

```powershell
$env:VERCEL = '1'
npm.cmd run build
Remove-Item Env:VERCEL
```

Se um deploy indicar React Start `1.168.32`, confira o repositório, a branch e o commit exibidos no painel. O código atual usa `1.168.60`; um redeploy de um commit antigo pode continuar usando a dependência antiga. Não use a variável de bypass de segurança como solução.

A atualização do código no GitHub e o sucesso do build local não confirmam que o deploy remoto foi concluído; confira o status na Vercel.

## Build alternativo para Cloudflare Pages

Sem `VERCEL`, a configuração atual usa o preset `cloudflare-pages` e gera a saída em `dist/`. O arquivo `wrangler.toml` pertence a esse fluxo alternativo. Esta documentação não presume que exista um projeto Cloudflare ou um domínio configurado para a landing page de financiamento.

Referências técnicas: [Nitro na Vercel](https://nitro.build/deploy/providers/vercel) e [correção de segurança do TanStack Start](https://tanstack.com/blog/tanstack-start-security-update-cve-2026-102989).
