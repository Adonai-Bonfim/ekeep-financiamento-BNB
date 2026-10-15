# Rastreamento de contato — Ekeep Captação de Recursos

## Estado da implementação local

- Helper: `src/lib/analytics.ts`, com identificadores da captação e payloads limitados aos parâmetros técnicos.
- Eventos locais: `cta_solicitar_contato_click`, `cta_ir_para_formulario_click`, `form_start`, `form_submit_error` e `whatsapp_click`.
- Origens existentes: `header`, `hero`, `section`, `faq`, `footer` e `floating_button`. A tentativa após validação usa `form_success`.
- Teste automatizado: `node scripts/check-analytics.mjs`, com o servidor local ativo. Os testes interceptam o WhatsApp e não enviam mensagens.
- Nenhum ID GTM/GA4 foi instalado. URL oficial e IDs aprovados ainda precisam ser informados.
- A camada local não envia eventos ao GA4 por conta própria. As instruções de painel abaixo ainda precisam ser executadas após a confirmação do destino.
- GTM Preview, GA4 DebugView, publicação das tags e conferência no domínio oficial estão pendentes. Nenhuma publicação é realizada por esta implementação.
- A métrica é tentativa de contato após validação; não é comprovação de mensagem enviada ou venda.

## Solicitação para o agente deste repositório

Implemente a camada técnica de rastreamento da landing page de **captação de recursos** seguindo esta especificação. Inspecione primeiro o projeto e adapte a implementação à estrutura existente. Este documento não significa que as funcionalidades já estejam implementadas.

O objetivo é saber quantas pessoas começaram a preencher o formulário e quantas, após preenchê-lo corretamente, acionaram o contato pelo WhatsApp. Não criar backend, API de leads, Google Sheets, Apps Script ou banco de dados.

## Preservação obrigatória

- Não alterar layout, cores, imagens, textos, SEO, espaçamentos, animações ou responsividade.
- Preservar os campos, validações, mensagens, telefone de destino e mensagem de WhatsApp existentes nesta landing page.
- Não copiar serviços, categorias, telefone ou textos da página de inventário.
- Não adicionar bibliotecas se os recursos existentes forem suficientes.
- Não fazer commit, push ou publicação sem solicitação do usuário.

## Definição da métrica

Fluxo esperado:

```text
Usuário preenche → validação aprovada → evento de contato → abertura do WhatsApp
```

A métrica representa **tentativa de contato pelo WhatsApp após formulário válido**. Não comprova abertura bem-sucedida do aplicativo, envio da mensagem, atendimento ou venda. Não contar somente o clique no botão de envio como formulário válido.

Não disparar `generate_lead`: não há confirmação de armazenamento nem de envio de mensagem. Se o repositório clonado contiver esse helper, não conectá-lo ao fluxo de WhatsApp.

Contagem de eventos não equivale a pessoas únicas. Uma nova ação legítima pode produzir outro evento; para medir pessoas, usar a métrica de usuários associada ao evento no GA4. Evitar apenas duplicações técnicas da mesma ação.

## Inspeção inicial

1. Localizar o formulário, sua validação e o ponto que abre o WhatsApp.
2. Localizar CTAs e links diretos de WhatsApp, inclusive header, hero, FAQ e botão flutuante.
3. Procurar scripts GTM, Google tag, GA4, `gtag`, `dataLayer` e helpers já existentes.
4. Se o código foi clonado da página de inventário, substituir identificadores analíticos de página/formulário nos eventos da captação e conferir os IDs de tags antes de ativá-los.
5. Reutilizar a arquitetura local sem duplicar scripts, declarações globais, handlers ou eventos.

## Identificadores desta landing page

```text
page_type: landing_page_captacao_recursos
form_name: captacao_recursos_ekeep
```

Usar `page_type` em todos os eventos e `form_name` nos eventos ligados ao formulário, inclusive no WhatsApp originado por ele.

## Eventos

| Evento no dataLayer | Quando ocorre | Parâmetros adicionais |
| --- | --- | --- |
| `cta_solicitar_contato_click` | Ativação do botão de envio, ainda que os campos estejam inválidos | Nenhum campo preenchido |
| `cta_ir_para_formulario_click` | Clique em CTA que leva ao formulário | `cta_location`: posição real do CTA |
| `form_start` | Primeira interação real com um campo | Uma vez por carregamento da página |
| `form_submit_error` | Falha de validação da tentativa | `error_type: validation` |
| `whatsapp_click` | Acionamento do WhatsApp | `source`: origem real |

Origens permitidas conforme os elementos que realmente existirem: `hero`, `header`, `section`, `faq`, `footer`, `final_cta`, `floating_button` e `form_success`.

`form_success` é reservado ao formulário cuja validação foi aprovada. Esse nome indica sucesso da validação, não envio da mensagem.

Exemplo do evento principal no código:

```ts
trackEvent("whatsapp_click", {
  page_type: "landing_page_captacao_recursos",
  form_name: "captacao_recursos_ekeep",
  source: "form_success",
});
```

Adaptar a assinatura se o helper acrescentar automaticamente os identificadores. Emitir uma única vez no handler da ação válida, junto da abertura já existente do WhatsApp. Não emitir também em efeito React, listener global ou renderização.

## Helper e robustez

- Centralizar chamadas ao dataLayer em `src/lib/analytics.ts` ou equivalente existente.
- Usar TypeScript com nomes e parâmetros permitidos, sem aceitar objetos arbitrários do formulário.
- Declarar `window.dataLayer` sem duplicar a declaração caso já exista.
- Ser seguro em SSR: não acessar `window` ou `document` no servidor.
- Preservar um dataLayer existente; nunca zerar a fila do GTM.
- Continuar funcionando sem GTM e com bloqueador de analytics. Falhas do rastreamento não devem impedir o contato.
- Preservar a abertura síncrona do WhatsApp dentro da ação do usuário para evitar bloqueio de pop-up. Não aguardar retorno do Analytics para abrir o WhatsApp.
- Não interpretar `window.open()` retornando `null` como falha garantida: isso também pode ocorrer com `noopener`.
- Evitar duplicação em StrictMode, re-renderizações e propagação entre handlers.
- Para validação nativa, registrar apenas um erro por tentativa, mesmo quando vários campos emitirem `invalid`. Reiniciar o controle na próxima tentativa, inclusive por teclado.
- Não desabilitar a validação nativa apenas para facilitar o rastreamento.

## Privacidade

Nunca enviar ao dataLayer, GA4 ou Ads nome, empresa preenchida, e-mail, telefone, cidade/endereço, mensagem ou necessidade digitada. Não enviar objetos do formulário, texto do WhatsApp, URL completa de `wa.me` ou mensagens brutas de erro.

Preservar o envio atual desses dados ao WhatsApp solicitado pelo visitante; não criar outras cópias, logs ou destinos. Não persistir dados do formulário em localStorage/sessionStorage.

Se houver captura de UTMs, manter separada dos eventos e não enviar valores arbitrários de URL como parâmetros analíticos. A captura local de UTMs não configura por si só o recebimento de eventos no GA4.

## GTM e GA4: confirmar o destino

Antes de instalar, obter ou confirmar:

- URL oficial da landing page de captação de recursos;
- ID do contêiner GTM aprovado para essa página;
- ID de medição GA4 aprovado para essa página.

**Não copiar automaticamente os IDs da página de inventário.** Os IDs `GTM-KJT3VZVW` e `G-WQPGG4ZJ1Q` pertencem à configuração usada no projeto de inventário e não constituem autorização para uso na captação.

Pode haver reutilização deliberada de uma propriedade ou contêiner, desde que confirmada pelo usuário e com separação por hostname/page_type. Não instalar IDs fictícios. Se faltarem IDs, concluir a camada local de eventos e informar a pendência.

Se for instalado GTM, incluir uma única vez seu script no head e o noscript no início do body, adaptados ao framework. Não instalar GA4 diretamente se ele já for carregado pelo GTM.

## Configuração no painel GTM

Esta etapa é separada da alteração no repositório. Se não houver acesso ao painel, entregar as instruções e não afirmar que as tags foram criadas ou publicadas.

1. Configurar uma Google tag com o ID GA4 aprovado, acionada na inicialização das páginas pertinentes.
2. Criar variáveis da camada de dados, versão 2: `DLV - source` para `source` e `DLV - page_type` para `page_type`.
3. Criar um acionador de evento personalizado com nome exato `whatsapp_click`, sem regex.
4. Aplicar as duas condições abaixo:

```text
DLV - source    é igual a    form_success
DLV - page_type é igual a    landing_page_captacao_recursos
```

5. Criar uma tag de evento GA4 com nome de evento:

```text
contato_whatsapp_captacao
```

6. Associar somente o acionador acima. Parâmetros opcionais seguros: `page_type`, `form_name` e `source`.
7. Não enviar esse mesmo evento também diretamente pelo código ou por uma segunda regra do GA4.
8. Criar tags específicas para os demais eventos se o usuário desejar acompanhá-los. Estar no dataLayer não significa estar nos relatórios GA4.

No GA4, revisar a medição otimizada: desativar interações automáticas de formulário para evitar duplicação e cliques de saída automáticos para evitar coleta da URL completa do WhatsApp. Não duplicar page_view nem configurar pageviews extras por cliques nas âncoras da landing page.

Marcar `contato_whatsapp_captacao` como evento principal no GA4. Se houver integração com Ads, configurar uma única conversão para essa ação e descrevê-la como tentativa de contato pelo formulário, não como mensagem confirmada.

## Validação antes de publicar

- Executar TypeScript, build e lint disponíveis no projeto; reportar problemas preexistentes sem alterar arquivos alheios ao escopo.
- Testar desktop, mobile e envio por teclado.
- Confirmar que foco/edição em vários campos produz apenas um `form_start` por carregamento.
- Formulário vazio ou inválido: intenção/erro podem ocorrer; `whatsapp_click` com `form_success` e a tag principal não podem disparar.
- Formulário válido: uma ação gera um `whatsapp_click` com identificadores da captação e `source: form_success`.
- Botão flutuante: `source: floating_button`; a tag principal do formulário não dispara.
- Conferir outros links de WhatsApp e suas origens.
- Conferir ausência de dados pessoais em TODOS os eventos e parâmetros enviados, inclusive os gerados automaticamente pelas tags.
- Testar GTM bloqueado: formulário e WhatsApp continuam funcionando.
- No GTM Preview, confirmar a tag principal disparando uma vez na ação válida e não disparando nas ações inválidas ou flutuantes.
- No GA4 DebugView, confirmar o recebimento de `contato_whatsapp_captacao`.
- Não enviar a mensagem de teste no WhatsApp; basta verificar o direcionamento.

Publicar o código do site e o contêiner GTM somente quando solicitado. São publicações diferentes. Depois, repetir a conferência no domínio oficial, não apenas em localhost. A lista de eventos processados pode atualizar depois do DebugView; não recriar tags por esse atraso.

## Entrega esperada

Informar arquivos criados/alterados, eventos implementados, testes realizados, IDs efetivamente utilizados e o que ainda depende dos painéis GTM/GA4. Confirmar que não houve alteração visual, criação de backend ou armazenamento de dados pessoais. Distinguir claramente código local, código publicado, tags em Preview e tags publicadas.
