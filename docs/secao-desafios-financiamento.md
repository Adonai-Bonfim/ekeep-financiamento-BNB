# Seção — Financiamento empresarial sem complicações

Substituir a seção atual de dificuldades de captação por uma composição visual próxima à imagem de referência “Financiamento empresarial sem complicações.png”.

## Conteúdo de abertura

- Chamada superior: **O QUE PODE DIFICULTAR A CAPTAÇÃO**.
- Título: **O financiamento da sua empresa não precisa ser um processo complicado.**
- Destacar apenas **processo complicado.** em laranja.
- Subtítulo: Muitas empresas conhecem as oportunidades do Banco do Nordeste, mas encontram desafios que acabam atrasando seus projetos e consumindo o tempo da equipe.

No desktop, buscar esta quebra de título, permitindo adaptação conforme o espaço disponível:

```text
O financiamento da sua empresa
não precisa ser um processo complicado.
```

## Cards de dificuldades

Manter os seis cards na ordem abaixo, em três colunas e duas linhas no desktop.

| Ícone em traço laranja | Título | Descrição |
| --- | --- | --- |
| Lupa | Não sabe por onde começar? | Existem várias linhas de crédito, mas nem sempre é simples identificar qual se aplica à sua empresa e se ela é elegível. |
| Moedas empilhadas | Não sabe quanto pode financiar? | Limites de financiamento, contrapartidas e garantias geram dúvidas antes mesmo de iniciar o processo. |
| Documento | Burocracia e falta de tempo | O processo é longo e documental, com diversas exigências que demandam tempo da sua equipe. |
| Pessoas | Equipe interna não domina o assunto | Sem familiaridade com as linhas de crédito e com os procedimentos, a equipe interna pode ter dificuldade para avançar. |
| Setas circulares | Idas e vindas com o banco | Pendências, informações incompletas e solicitações adicionais geram retrabalho e desgaste durante a análise. |
| Relógio | O crédito não chega no tempo do negócio | Quando a busca começa na urgência, o financiamento pode demorar mais do que o necessário, levando a empresa a recorrer a alternativas mais caras. |

## Painel fotográfico à direita

Foto de dois profissionais analisando documentos financeiros em uma mesa de escritório: homem de óculos com blazer escuro e mulher com blazer bege, com notebook e gráficos impressos. Ambiente corporativo com janelas, luz natural e fundo levemente desfocado.

A foto ocupa toda a altura da coluna lateral, com recorte vertical e cantos arredondados de aproximadamente 32 px. Usar `object-fit: cover` e ajustar o enquadramento para preservar os rostos e os documentos.

No canto superior direito da foto, sobre uma área escura, inserir o texto branco:

> Com o planejamento certo, sua empresa aproveita melhor as oportunidades e ganha tempo para focar no que realmente importa.

Adicionar uma linha vertical fina laranja à esquerda desse texto. Garantir legibilidade com um gradiente escuro discreto sobre a região da foto, se necessário.

## Card sobreposto à foto

Posicionar um card claro próximo à base da foto, com margem interna de aproximadamente 16–24 px em relação às bordas do painel.

- Ícone: gráfico de barras com seta ascendente, em traço laranja, dentro de um quadrado pêssego.
- Divisória: linha vertical fina laranja entre o ícone e o texto.
- Título: **A Ekeep ajuda sua empresa a superar esses desafios.**
- Descrição: Da identificação das linhas à condução do processo com o Banco do Nordeste, para que você avance com mais segurança e menos desgaste.

O card deve ter fundo creme quase branco, cantos de aproximadamente 16 px, sombra suave e texto alinhado à esquerda. No desktop, ícone e texto ficam lado a lado. Permitir crescimento do card conforme o conteúdo.

## Layout e aparência

| Elemento | Especificação |
| --- | --- |
| Fundo da seção | Branco ou cinza muito claro, próximo a `#FCFCFD`. |
| Colunas principais | Área de conteúdo à esquerda com aproximadamente 60%; foto à direita com aproximadamente 40%. |
| Espaçamento entre colunas | Aproximadamente 32 px. |
| Área esquerda | Abertura no topo e grade de seis cards abaixo. |
| Chamada superior | Laranja da Ekeep, maiúsculas, cerca de 14 px, espaçamento entre letras e pequeno traço horizontal à esquerda. |
| Título principal | Escuro, peso 800, cerca de 44–48 px no desktop, entrelinha de 1,1. Usar a fonte existente na página. |
| Subtítulo | Cinza, cerca de 18–20 px, entrelinha de 1,45 e margem inferior de 24–28 px. |
| Grade de cards | Três colunas iguais, duas linhas, intervalo de aproximadamente 18–20 px. |
| Cards | Fundo branco, borda cinza muito clara, sombra leve, cantos de 12 px e padding de 24 px. |
| Ícones dos cards | Cerca de 32 px, dentro de um quadrado pêssego de aproximadamente 60 px, com cantos de 12 px. |
| Títulos dos cards | Escuros, peso 700, aproximadamente 20 px e entrelinha de 1,2. |
| Descrições dos cards | Cinza, aproximadamente 16–18 px e entrelinha de 1,45. |
| Altura dos cards | Uniforme em cada linha, definida pelo conteúdo; não cortar textos. |
| Laranja | Usar o token de cor primária existente da Ekeep. |

## Responsividade

- Em telas largas, manter conteúdo e foto lado a lado, com seis cards em grade de três colunas.
- Em tablets, empilhar as áreas principais e usar duas colunas para os cards.
- Em celulares, usar uma coluna para os cards e colocar o painel fotográfico após a grade.
- Reduzir o título principal proporcionalmente, sem impor quebras de linha que causem overflow.
- No celular, permitir que o card de apoio apareça no fluxo abaixo da foto caso a sobreposição prejudique a leitura ou esconda os rostos.
- Evitar altura fixa para a seção e para os cards de texto.
- Preservar margens laterais e o alinhamento com as demais seções da landing page.

## Acessibilidade e implementação

- Usar `h2` para o título da seção e `h3` para os títulos dos cards e do bloco de apoio.
- Usar elementos `article` para os seis cards.
- Ícones e linhas decorativas devem ter `aria-hidden="true"`.
- A foto pode usar `alt=""` quando servir apenas como ilustração dos textos da seção.
- Manter os textos sobrepostos como HTML, sem incorporá-los à imagem.
- Garantir contraste legível para os textos cinza, brancos e laranja.
- Utilizar os ícones da biblioteca existente e CSS para a composição.
- Preservar as demais seções, o formulário e os links atuais.

## Imagem necessária

A captura de referência não contém a fotografia original isolada. Usar uma fotografia fornecida para o projeto ou gerar uma nova imagem com composição equivalente. Não usar a captura inteira como fundo, pois os textos e cards devem continuar responsivos e acessíveis.

## Critérios de aceite

- Composição próxima à referência: abertura e seis cards à esquerda, foto vertical com mensagem e card de apoio à direita.
- Apenas “processo complicado.” em laranja no título principal.
- Seis dificuldades com os textos e a ordem especificados.
- Foto sem deformação e com os rostos preservados no recorte.
- Nenhum texto cortado, sobreposição involuntária ou rolagem horizontal.
- Verificação visual no desktop e no celular.
- Após implementar, validar TypeScript, build de produção e testes de responsividade do projeto.
