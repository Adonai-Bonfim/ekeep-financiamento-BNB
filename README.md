# Ekeep | Consultores & Auditores

Site institucional da **Ekeep**, desenvolvido para apresentar os serviços de inventário de estoque e imobilizado, explicar a metodologia de trabalho e facilitar o contato comercial pelo WhatsApp.

A aplicação reúne conteúdo institucional, benefícios, etapas do processo, depoimentos e perguntas frequentes em uma landing page responsiva, com renderização no servidor. 

## Visão geral

- Apresentação dos serviços de inventário de estoque e de bens patrimoniais.
- Seções de diferenciais, riscos e processo de execução.
- Depoimentos com movimento horizontal no mobile e grade estática no desktop.
- Perguntas frequentes em acordeão.
- Formulário que abre o WhatsApp do especialista com os dados preenchidos e o serviço selecionado.
- Imagens adaptativas em WebP, com fallback em JPEG.
- Navegação por teclado, foco visível e respeito à preferência por movimento reduzido.

> O formulário prepara a mensagem, mas o visitante precisa confirmar o envio no WhatsApp. Não há armazenamento em planilha ou banco de dados, nem dependência de Apps Script.

## Tecnologias

| Tecnologia                       | Aplicação                               |
| -------------------------------- | --------------------------------------- |
| React 19 e TypeScript            | Componentes e tipagem                   |
| TanStack Start e TanStack Router | Renderização no servidor e roteamento   |
| Vite 8                           | Desenvolvimento e build                 |
| Tailwind CSS 4                   | Estilos e responsividade                |
| Nitro                            | Servidor de produção para Node.js       |
| Lucide React e Radix UI          | Ícones e componentes de interface       |
| Sharp                            | Geração de variantes de imagens         |
| Playwright                       | Verificações automatizadas no navegador |
| ESLint e Prettier                | Análise e formatação do código          |

As versões das dependências estão definidas em `package.json` e fixadas em `package-lock.json`.

## Requisitos

- **Node.js 24**, versão utilizada na validação do projeto.
- **npm**, para instalação e execução dos scripts.
- **Microsoft Edge**, para executar os testes de navegador com a configuração padrão.

A execução local atual não exige arquivo `.env`, credenciais de API ou banco de dados.

## Instalação e desenvolvimento

Na pasta do projeto, instale as dependências:

```sh
npm ci
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Acesse **http://localhost:5173**. As alterações nos arquivos são refletidas automaticamente no navegador.

O servidor também aceita conexões da rede local. Para visualizar em outro dispositivo conectado à mesma rede, utilize `http://<IP-do-computador>:5173`. A porta está configurada como exclusiva; caso esteja ocupada, encerre o processo anterior ou escolha outra:

```sh
npm run dev -- --port 5174
```

No PowerShell, se a execução de `npm.ps1` estiver bloqueada, utilize `npm.cmd` no lugar de `npm`.

## Comandos disponíveis

| Comando                   | Descrição                                            |
| ------------------------- | ---------------------------------------------------- |
| `npm run dev`             | Inicia o servidor com atualização automática         |
| `npm run build`           | Gera o build de produção                             |
| `npm run build:dev`       | Gera um build no modo de desenvolvimento             |
| `npm run preview`         | Abre uma prévia local do build                       |
| `npm start`               | Executa o servidor de produção previamente compilado |
| `npm run typecheck`       | Verifica os tipos sem gerar arquivos                 |
| `npm run lint`            | Executa a análise estática do código                 |
| `npm run format`          | Formata os arquivos do projeto                       |
| `npm run images:optimize` | Recria as variantes WebP das imagens                 |
| `npm run test:responsive` | Verifica layout e interações em múltiplas larguras   |

## Estrutura do projeto

```text
public/                     # Arquivos públicos e favicon
scripts/                    # Otimização de imagens e testes de navegador
src/
  assets/                   # Imagens e marcas
    responsive/             # Variantes WebP geradas
  components/
    ekeep/                  # Componentes específicos do site
    ui/                     # Componentes reutilizáveis de interface
  hooks/                    # Hooks compartilhados
  lib/                      # Utilitários e tratamento de erros
  routes/
    __root.tsx              # Documento HTML, metadados e telas de erro
    index.tsx               # Conteúdo e seções da landing page
  router.tsx                # Configuração do roteador
  routeTree.gen.ts           # Árvore de rotas gerada automaticamente
  server.ts                 # Entrada do servidor e tratamento de falhas
  start.ts                  # Middleware e proteção CSRF
  styles.css                # Identidade visual e regras responsivas
vite.config.ts              # Plugins, resolução de caminhos e servidor local
RESPONSIVIDADE.md            # Documentação técnica de layout e validação
```

`src/routeTree.gen.ts` é gerado automaticamente e não deve ser editado manualmente.

## Manutenção do conteúdo

| Alteração                                         | Local principal                                               |
| ------------------------------------------------- | ------------------------------------------------------------- |
| Textos, serviços, etapas, depoimentos e FAQ       | `src/routes/index.tsx`                                        |
| Cards de experiência, governança e acompanhamento | `src/components/ekeep/Credentials.tsx`                        |
| Campos e mensagem do formulário                   | `src/components/ekeep/LeadForm.tsx`                           |
| Número de destino do WhatsApp                     | Constante `WHATSAPP_NUMBER` em `LeadForm.tsx`                 |
| Número exibido no rodapé                          | `src/routes/index.tsx`                                        |
| Logomarca                                         | `src/components/ekeep/Logo.tsx` e `src/assets/`               |
| Favicon                                           | `public/favicon-ekeep.svg`                                    |
| Metadados e fontes                                | `src/routes/__root.tsx` e metadados de `src/routes/index.tsx` |
| Cores, tipografia, espaçamentos e breakpoints     | `src/styles.css`                                              |

Ao substituir as fotografias de origem, execute `npm run images:optimize` e inclua as variantes geradas em `src/assets/responsive/` junto à alteração.

## Qualidade e testes

Antes de disponibilizar uma alteração, execute:

```sh
npm run typecheck
npm run lint
npm run build
```

Com o servidor de desenvolvimento ativo, execute os testes de navegador em outro terminal:

```sh
npm run test:responsive
node scripts/check-brand-carousel.mjs
```

A verificação responsiva cobre **17 larguras entre 192 e 3440 pixels**, incluindo overflow, áreas de toque, sobreposição entre cards e imagem, menu, FAQ e campos obrigatórios. O teste complementar verifica a animação dos depoimentos, movimento reduzido, grade desktop, logo e favicon.

Relatórios e capturas são gravados em `artifacts/responsive/`, diretório não versionado. Os testes automatizados não substituem a validação em dispositivos físicos e diferentes navegadores.

O script `check-responsive.mjs` aceita:

| Variável             | Padrão                  | Finalidade                              |
| -------------------- | ----------------------- | --------------------------------------- |
| `TEST_URL`           | `http://localhost:5173` | Endereço da aplicação sob teste         |
| `PLAYWRIGHT_CHANNEL` | `msedge`                | Canal de navegador instalado a utilizar |

O teste `check-brand-carousel.mjs` utiliza Edge e `http://localhost:5173` diretamente.

Detalhes de arquitetura fluida, breakpoints e acessibilidade estão em [RESPONSIVIDADE.md](./RESPONSIVIDADE.md).

## Build e publicação no Cloudflare Pages

O projeto usa o preset Nitro `cloudflare-pages`, preservando a renderização no servidor. O build gera `dist/`, incluindo assets, `_worker.js/` e `_routes.json`. O arquivo interno `_worker.js` é o servidor de Pages Functions; não significa publicação como um projeto Workers separado.

O projeto **ekeep-inventario** foi criado no Pages como **Direct Upload**, com endereço padrão `https://ekeep-inventario.pages.dev`. O Worker existente não é convertido pelo commit e permanece separado. Nesta modalidade, pushes no GitHub não publicam automaticamente: execute o comando de publicação abaixo após o build. Para automação, configure uma pipeline própria; se preferir a integração Git nativa, crie outro projeto Pages nessa modalidade.

Para um projeto Pages com integração Git, use:

| Campo | Valor |
| --- | --- |
| Branch de produção | `main` |
| Framework preset | `None` |
| Comando de build | `npm run build` |
| Diretório de saída | `dist` |
| Diretório raiz | raiz do repositório |
| Versão Node (`NODE_VERSION`) | `24` |

Não configure `npx wrangler deploy` no projeto Pages. A integração Git publica automaticamente após o build. Remova uma eventual variável antiga `NITRO_PRESET` do painel para não sobrescrever o preset deste projeto.

O `wrangler.toml` versionado define o diretório de Pages, a data de compatibilidade e `nodejs_compat`. Não contém rotas de domínio, zone_id ou configuração de DNS. O Nitro também gera uma configuração interna em `dist/_worker.js/wrangler.json`, ajustando o caminho relativo para a mesma pasta dist.

Validação local:
```sh
npm ci
npm run typecheck
npm run build
npx wrangler pages dev dist
```

Para desenvolvimento, continue usando `npm run dev`. O script antigo `npm start` atende somente um build Node e não deve ser usado para esta saída Pages. Nenhum script do package.json foi alterado.

Publicação do projeto Direct Upload criado:
```sh
npx wrangler pages deploy dist --project-name ekeep-inventario --branch main
```

A primeira publicação no Pages fornece `NOME_DO_PROJETO.pages.dev`. O nome depende da disponibilidade e da escolha no painel; não é criado apenas pelo build local.

### Subdomínio com DNS no cPanel

Depois de validar o endereço pages.dev:
1. No projeto Pages, adicione `inventario.ekeepconsultores.com.br` em **Custom domains**.
2. No cPanel, configure somente o CNAME `inventario` apontando para o endereço `NOME_DO_PROJETO.pages.dev` informado pela Cloudflare.
3. Aguarde a validação do domínio e do certificado.

Essa associação deve ser iniciada no Pages antes do CNAME. Não é necessário transferir nameservers, adicionar o domínio raiz como zona Cloudflare ou alterar registros do domínio principal/e-mail. Nenhum registro DNS é modificado pelo código ou pelo build. Se já existir registro para inventario, ajuste somente esse subdomínio ao fazer a troca.

Referências: [integração Git](https://developers.cloudflare.com/pages/get-started/git-integration/), [configuração Wrangler para Pages](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), [domínios externos](https://developers.cloudflare.com/pages/configuration/custom-domains/).
