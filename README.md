# Ekeep | Consultores & Auditores

Site institucional da **Ekeep**, desenvolvido para apresentar os serviços de inventário de estoque e imobilizado, explicar a metodologia de trabalho e facilitar o contato comercial pelo WhatsApp.

A aplicação reúne conteúdo institucional, benefícios, etapas do processo, depoimentos e perguntas frequentes em uma landing page responsiva, com renderização no servidor.

## Visão geral

- Apresentação dos serviços de inventário de estoque e de bens patrimoniais.
- Seções de diferenciais, riscos e processo de execução.
- Depoimentos com movimento horizontal no mobile e grade estática no desktop.
- Perguntas frequentes em acordeão.
- Formulário que prepara uma mensagem com os dados preenchidos e abre o WhatsApp.
- Imagens adaptativas em WebP, com fallback em JPEG.
- Navegação por teclado, foco visível e respeito à preferência por movimento reduzido.

> O formulário não armazena contatos em banco de dados nem envia mensagens automaticamente. O visitante conclui o envio no WhatsApp.

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

## Build e publicação

Gere e execute a versão de produção:

```sh
npm run build
npm start
```

O build cria a pasta `.output/`, contendo o servidor Node.js e os arquivos públicos. Por padrão, o servidor de produção utiliza a porta **3000**.

Para uma instalação em servidor próprio:

1. Execute `npm ci` e `npm run build` no ambiente de build.
2. Transfira a pasta `.output/` completa para o servidor de destino.
3. Execute `node .output/server/index.mjs` com Node.js.
4. Configure o domínio, HTTPS e o gerenciamento do processo na infraestrutura escolhida.

As variáveis `PORT` e `HOST` permitem ajustar a escuta do servidor. Exemplo em PowerShell:

```powershell
$env:PORT = "3000"
$env:HOST = "0.0.0.0"
npm start
```

O diretório `.output/public` contém os assets, mas a publicação atual também depende do servidor de renderização. Não publique apenas essa pasta em uma hospedagem exclusivamente estática.
