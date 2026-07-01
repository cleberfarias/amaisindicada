# Plano de reformulacao do site A Mais Indicada

Data: 2026-05-15

Backlog detalhado: [backlog-reformulacao-site.md](./backlog-reformulacao-site.md)

## Objetivo

Reformular o site da A Mais Indicada para transformar uma presenca digital antiga e amadora em uma experiencia institucional e comercial mais madura, mantendo as cores e fontes da marca. O novo site deve comunicar tradicao familiar, qualidade artesanal, confianca e preparo para expansao, inclusive exportacao.

## Diagnostico inicial

- Projeto atual em React com Create React App, Bootstrap, styled-components, Firebase e rotas manuais.
- Identidade visual espalhada por componentes, com cores repetidas diretamente no codigo.
- Textos e componentes apresentam problemas de encoding em palavras acentuadas, como "voce", "catalogo" e "lancamentos" aparecendo quebradas na interface/codigo.
- Home depende de carrosseis grandes e cards promocionais, com pouca hierarquia editorial.
- Catalogo, cadastro, carrinho e checkout existem, mas precisam ser avaliados como fluxo real de venda antes de serem mantidos como e-commerce.
- README descreve back-end separado em Java Spring Boot e PostgreSQL, mas o front-end atual tambem tem Firebase e dependencias de server/Express/Mongoose, indicando acoplamento e historico tecnico confuso.

## Direcao de marca

Manter:

- Paleta principal percebida no projeto: amarelo/dourado `#ffd38f`, marrom escuro `#30261d`, azul/verde institucional `#22778b`, branco e tons quentes de apoio.
- Fontes ja usadas ou indicadas no projeto: Montserrat, Playfair Display e PT Sans Caption, depois de validar quais fazem parte da identidade real.
- Fotografias e ativos reais de produto, familia, producao, alambique e colecao.

Evoluir:

- Usar as cores com mais disciplina: fundo claro quente, texto marrom, acentos dourados e azul/verde apenas para navegacao, rodape e pontos de confianca.
- Trocar composicao amadora de carrossel por uma home editorial: produto real, historia, processo, premios/credibilidade, catalogo e contato comercial.
- Criar linguagem visual export-ready: embalagem, origem, ingredientes, teor alcoolico, capacidade produtiva, conformidade e canais B2B.

## Modernizacao e uso de IA

A reformulacao deve tratar IA como uma camada util para vender melhor, atender melhor e acelerar conteudo, nao como enfeite. A experiencia principal continua sendo um site rapido, bonito, confiavel e facil de usar.

### IA no MVP

- Gerador de mensagem para WhatsApp: usuario escolhe interesse, produto e tipo de contato; o site monta uma mensagem clara para atendimento.
- Recomendador simples de sabores: perguntas rapidas sobre preferencia (doce, cremoso, frutado, presente, revenda) e sugestoes de produtos.
- Conteudo assistido por IA: textos institucionais, descricoes de produto, chamadas comerciais e versoes iniciais para exportacao.
- FAQ inteligente controlado: respostas baseadas em perguntas frequentes cadastradas, sem inventar informacao sensivel sobre compra, envio, registro ou exportacao.
- Classificacao de leads no formulario: consumidor final, lojista, distribuidor, representante ou exportacao.

### IA em fase posterior

- Busca semantica no catalogo, permitindo buscar por ocasiao, sabor, perfil e tipo de cliente.
- Assistente de atendimento conectado a base de produtos, politicas comerciais e perguntas frequentes.
- Traducao assistida e revisada para ingles e espanhol.
- Geracao de catalogo comercial em PDF para distribuidores e exportacao.
- Resumo automatico dos contatos recebidos para facilitar follow-up comercial.
- Painel interno com sugestoes de resposta para WhatsApp, e-mail ou Instagram.

### Limites e cuidados

- IA nao deve prometer disponibilidade, preco, envio, certificacao ou exportacao sem dados confirmados.
- Qualquer resposta sobre alcool, idade minima, compra e distribuicao precisa respeitar venda responsavel.
- Dados de contato e leads devem ter consentimento claro.
- O primeiro lancamento deve funcionar mesmo se a IA estiver indisponivel.

## Proposta de produto digital

Nova direcao: site institucional moderno + catalogo dinamico + area administrativa + area de exportacao + assistente de IA para recomendacao e atendimento inicial.

O objetivo e fazer a marca parecer pronta para varejo, distribuicao e conversa internacional, sem assumir um e-commerce completo antes de validar operacao, pagamento, frete, estoque e atendimento. O catalogo nao deve depender de deploy para novos produtos: a marca precisa conseguir cadastrar cachacas, licores e futuros derivados da cana-de-acucar pela area administrativa.

## Publicos

- Consumidor final no Brasil: quer conhecer sabores, historia, contato e onde comprar.
- Lojistas, distribuidores e representantes: precisam entender linha de produtos, posicionamento, contato comercial e confiabilidade.
- Potenciais compradores internacionais: precisam de uma pagina clara sobre exportacao, origem, capacidade, catalogo e contato B2B.

## Estrutura proposta

### 1. Home

- Hero com foto real de produto/producao e mensagem direta de marca.
- Destaques de linhas: licores, cachacas e edicoes especiais.
- Bloco de historia familiar e origem.
- Bloco de processo artesanal e qualidade.
- Chamada para catalogo e contato comercial.
- Sinalizacao de venda responsavel e verificacao 18+ mais elegante.

### 2. Catalogo

- Grid de produtos com filtros por categoria, sabor, volume e linha.
- Pagina de detalhe com foto, descricao, ingredientes, volume, teor alcoolico e sugestao de consumo.
- CTA principal: comprar/solicitar orcamento via WhatsApp ou canal definido.
- Separar catalogo institucional de carrinho se o e-commerce ainda nao estiver pronto.
- Recomendador de sabores com IA ou regras assistidas para ajudar consumidores e lojistas.
- Dados consumidos por API para permitir cadastro de novos produtos sem alterar codigo.

### 2.1. Area administrativa

- Login simples por token no MVP, evoluindo depois para usuarios e permissoes.
- Cadastro, edicao e remocao logica de produtos.
- Campos iniciais: ID, nome, linha, perfil comercial, imagem e destaque na Home.
- Evolucao prevista: upload de imagens, ficha tecnica completa, status comercial, idiomas e auditoria.

### 3. Institucional

- Historia da familia e da marca.
- Regiao de origem e processo produtivo.
- Fotos reais de producao, familia e alambique.
- Provas de confianca: tempo de mercado, premios, registros, boas praticas ou certificacoes, se existirem.

### 4. Exportacao

- Pagina nova focada em mercado B2B e internacional.
- Conteudo minimo: portfolio, origem brasileira, diferenciais, capacidade, formatos de embalagem, documentacao disponivel e contato comercial.
- Versao em portugues primeiro; preparar estrutura para ingles e espanhol.

### 5. Contato

- Formulario simples e confiavel.
- WhatsApp, Instagram, e-mail comercial e localizacao.
- Caminhos separados: consumidor final, lojista/distribuidor e exportacao.
- Classificacao do lead e geracao de mensagem inicial para atendimento.

## Arquitetura tecnica recomendada

### Curto prazo

- Corrigir encoding dos arquivos para UTF-8.
- Centralizar tokens visuais: cores, fontes, espacamentos e breakpoints.
- Remover estilos inline onde atrapalham manutencao.
- Reorganizar componentes em secoes de pagina e componentes reutilizaveis.
- Revisar rotas com caracteres especiais, principalmente a rota atual de catalogo.
- Manter o site dinamico com API de produtos e area administrativa inicial.
- Usar arquivo JSON como persistencia de baixo risco para homologacao e trocar por banco/CMS quando a operacao exigir.

### Medio prazo

- Migrar de Create React App para Next.js se SEO, performance e internacionalizacao forem prioridades.
- Separar fluxo institucional do fluxo de loja.
- Definir backend definitivo para produtos: Node, Java/Spring existente, banco relacional ou CMS headless.
- Criar uma camada de API para recursos de IA, sem expor chaves no front-end.
- Adicionar testes basicos de renderizacao e build.

### Longo prazo

- Internacionalizacao PT/EN/ES.
- CMS para produtos, banners e paginas institucionais.
- Integracao real com CRM/WhatsApp para leads comerciais.
- Busca semantica e assistente com base de conhecimento controlada.
- Analytics com eventos de catalogo, contato e exportacao.

## Roadmap sugerido

### Fase 1 - Fundacao e direcao visual

- Inventariar paginas, componentes e ativos.
- Definir tokens de marca preservando cores e fontes.
- Criar wireframes da Home, Catalogo, Institucional, Exportacao e Contato.
- Definir se o site sera institucional com catalogo ou e-commerce completo.
- Definir quais recursos de IA entram no MVP e quais ficam para depois.

### Fase 2 - Redesign da experiencia

- Implementar novo layout global: header, navegacao, rodape e age gate.
- Refazer Home com narrativa de marca e CTAs claros.
- Refazer Catalogo e detalhe de produto.
- Criar API e admin de produtos para o catalogo dinamico.
- Refazer Institucional e Contato.
- Criar pagina Exportacao.
- Implementar recomendador inicial de sabores e gerador de mensagem para WhatsApp.

### Fase 3 - Qualidade e lancamento

- Corrigir textos, acentos e responsividade.
- Otimizar imagens e acessibilidade.
- Rodar build, testes e revisar performance.
- Configurar SEO, metatags, Open Graph, sitemap e robots.
- Validar respostas geradas por IA e criar fallback sem IA.
- Publicar ambiente de homologacao e validar com a marca.

### Fase 4 - Expansao

- Traduzir paginas principais.
- Preparar catalogo comercial para distribuidores.
- Medir conversoes e ajustar CTAs.
- Evoluir busca semantica, FAQ inteligente e assistente de atendimento.
- Integrar CMS, CRM ou back-end definitivo.

## Decisoes pendentes

- O site sera catalogo dinamico com atendimento comercial ou tera compra online completa?
- O backend definitivo sera Node, Java/Spring, CMS headless ou outro stack?
- Quais fontes sao oficiais da marca?
- A paleta atual e definitiva ou deve ser refinada mantendo equivalencia visual?
- Existem fotos profissionais recentes de produto, familia e producao?
- Existem registros, certificacoes, capacidade produtiva ou documentos para exportacao?
- Quais idiomas entram na primeira versao internacional?
- Qual IA sera usada e qual orcamento mensal aceitavel para API?
- O atendimento sera direcionado para WhatsApp, e-mail, CRM ou todos?
- Quais informacoes comerciais podem ser respondidas automaticamente?

## Indicadores de sucesso

- Site carrega rapido em mobile e desktop.
- Usuario entende em ate 5 segundos o que a marca vende e por que confiar.
- Catalogo fica facil de navegar e compartilhar.
- Lojistas e distribuidores encontram contato comercial sem friccao.
- Pagina de exportacao transmite seriedade, origem e preparo para conversa B2B.
- Recomendador aumenta cliques para produtos e contatos comerciais.
- Leads chegam classificados por tipo de interesse.
