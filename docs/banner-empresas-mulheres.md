# Banner — Empresas lideradas por mulheres

Substituir o bloco “Sua empresa é controlada por mulheres?” por um banner conforme a imagem de referência.

## Conteúdo

- Selo: **DESTAQUE**
- Título: **Sua empresa é liderada por mulheres?**
- Descrição: Algumas linhas de financiamento podem oferecer condições diferenciadas de cobertura para empresas com controle feminino, conforme os critérios do Banco do Nordeste.
- Complemento: Consulte as possibilidades para o perfil da sua empresa.
- Botão: **Quero entender essa condição →**
- Destino do botão: `#contato`.

## Composição no desktop

Banner horizontal com três áreas, alinhadas verticalmente ao centro:

| Área | Composição |
| --- | --- |
| Esquerda | Foto de uma empresária com blazer em tom terracota, braços cruzados, em ambiente corporativo. Recorte vertical preenchendo a altura do banner, com curvas decorativas laranja sobre a foto e transição suave para o fundo claro à direita. |
| Centro | Selo pequeno acima do título, seguido da descrição e do complemento. Texto alinhado à esquerda e espaçamento confortável. |
| Direita | Divisória vertical clara, ícone de mulheres em traço laranja e botão laranja com seta para a direita abaixo. |

## Aparência

- Fundo creme com leve tonalidade pêssego, aproximadamente `#FFF5EF`.
- Borda fina laranja clara, aproximadamente `#FFC5A3`.
- Cantos arredondados de 16 px e conteúdo interno recortado pelos cantos.
- Altura de referência: aproximadamente 160–180 px; permitir crescimento conforme o conteúdo.
- Foto ocupando aproximadamente 22% da largura; área central flexível; ação com cerca de 230 px.
- Título escuro, em negrito, aproximadamente 24 px.
- Descrição e complemento em cinza, aproximadamente 14 px, com entrelinha de 1,5.
- Selo com fundo claro, borda fina laranja, texto laranja em maiúsculas e cantos de 4 px.
- Botão com o laranja da identidade visual da Ekeep, texto branco em negrito e cantos de 8 px.
- Usar a tipografia existente na landing page.

## Responsividade e acessibilidade

- Em telas menores, empilhar foto, conteúdo e ação, preservando essa ordem.
- Permitir que os textos quebrem naturalmente, sem altura fixa ou rolagem horizontal.
- No celular, usar o botão com largura total e altura mínima de 44 px.
- Ocultar a divisória vertical no layout empilhado.
- Usar um título `h3`, seguindo a hierarquia da seção atual.
- A foto e os elementos decorativos podem ter texto alternativo vazio quando não acrescentarem informação ao conteúdo.
- Ícone e seta decorativos com `aria-hidden="true"`.
- Manter foco visível no botão e contraste legível.

## Imagem necessária

A referência mostra uma empresária, mas não fornece a fotografia original isolada. Para a implementação, usar uma imagem fornecida ou aprovada para esse banner, evitando ampliar o recorte da captura de tela.

## Critérios de aceite

- Banner visualmente próximo à referência, com foto à esquerda, conteúdo ao centro e ação à direita.
- Substituição apenas do bloco destacado, preservando os demais cards e seções.
- Texto sem promessa de aprovação ou cobertura universal de financiamento.
- Botão direcionando ao formulário de contato.
- Verificação em desktop e celular, além de TypeScript e build de produção após a implementação.
