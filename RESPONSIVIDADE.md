# Adaptação responsiva da landing page

Os textos comerciais e a sequência das seções foram preservados. As regras de layout estão em `src/styles.css`, com comentários junto aos pontos de transição.

## Hierarquia e leitura

- Base em uma coluna, sem largura mínima artificial para a página e sem mascarar problemas com `overflow-x: hidden` no documento.
- Título principal com `clamp(1.75rem, 1rem + 3.5vw, 3.75rem)`; títulos de seção com `clamp(1.5rem, 1.05rem + 2vw, 2.25rem)`.
- Conteúdo limitado a `80rem`, com margens centralizadas em monitores ultrawide e espaçamento lateral fluido. Textos extensos permanecem com larguras de leitura limitadas onde apropriado.
- Campos de formulário com fonte de `1rem`, rótulos explícitos e preenchimento automático. As colunas respondem à largura do próprio formulário usando container queries, sem a antiga coluna lateral fixa de 16rem.

## Pontos de transição

| Largura (base de 16px) | Comportamento                                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Abaixo de 352px        | Layout em uma coluna; botão flutuante entra no fluxo; cabeçalho deixa de ser fixo; imagens de fundo cedem espaço ao texto. |
| A partir de 640px      | Riscos, etapas e rodapé podem usar duas colunas; imagens dos serviços passam para a lateral.                               |
| A partir de 768px      | Diferenciais usam duas colunas.                                                                                            |
| A partir de 960px      | Credenciais, etapas, riscos e depoimentos usam três colunas; serviços, contato e FAQ usam duas.                            |
| A partir de 1200px     | Diferenciais usam cinco colunas com títulos alinhados por subgrid; serviços recuperam a imagem lateral.                    |
| A partir de 1280px     | Menu completo substitui o menu compacto.                                                                                   |

As alturas dos cards acompanham o conteúdo. Os riscos usam linhas iguais no desktop; o FAQ mantém altura natural, sem esticar a última pergunta.

## Interação e acessibilidade

- Alvos interativos com no mínimo `2.75rem` (44px na configuração padrão).
- Foco visível e atalho para pular ao conteúdo; documento identificado como `pt-BR`.
- Menu com `aria-expanded`, fechamento por Escape e devolução de foco ao botão; painel com rolagem interna para telas baixas.
- FAQ com estados de abertura, associação entre pergunta e resposta e regiões ocultas quando fechadas.
- Hover condicionado a mouse/ponteiro preciso; animação e rolagem suave desabilitadas quando há preferência por movimento reduzido.
- Nomes e empresas nos depoimentos podem quebrar linha, sem truncamento nem carrossel obrigatório.
- Não existem tabelas, modais ou diálogos ativos nesta landing page; os componentes genéricos não utilizados não foram alterados.

## Imagens e reprodução dos testes

As quatro imagens têm três variantes WebP cada, selecionadas por `picture`, `srcset` e `sizes`. Os JPEGs permanecem como fallback. A imagem principal tem prioridade alta; as demais preservam carregamento adiado. `aspect-ratio` reserva espaço nas imagens dos cards em telas estreitas.

Com as dependências instaladas:

```sh
npm run images:optimize
npm run dev -- --host 0.0.0.0 --port 5173
# Em outro terminal, com Edge instalado:
npm run test:responsive
```

O teste verifica 17 larguras entre 192 e 3440px, overflow, tamanho dos alvos, menu, FAQ, campos obrigatórios e movimento reduzido. Relatório e capturas ficam em `artifacts/responsive/` (não versionados). `TEST_URL` permite testar outro endereço; `PLAYWRIGHT_CHANNEL` permite selecionar outro canal instalado.

Validação realizada em Edge/Chromium headless, com inspeção das capturas de celular e desktop. Isso não substitui testes em aparelhos físicos, Safari/iOS ou uma auditoria completa de acessibilidade; não representa uma garantia de compatibilidade com todos os navegadores de relógios.
