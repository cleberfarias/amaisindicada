# Backlog de reformulacao do site A Mais Indicada

Data: 2026-05-15

## Legenda

- Prioridade P0: essencial para o MVP.
- Prioridade P1: importante para lancamento profissional.
- Prioridade P2: melhoria para evolucao depois do MVP.
- Status inicial: todo.

## Epic 1 - Fundacao tecnica

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| TEC-01 | P0 | Corrigir encoding dos arquivos para UTF-8 | Textos com acentos corretos no codigo e na interface | todo |
| TEC-02 | P0 | Revisar rotas com caracteres especiais | Rotas limpas, previsiveis e sem problema de acento | todo |
| TEC-03 | P0 | Centralizar tokens visuais | Arquivo/base com cores, fontes, espacamentos e breakpoints | done |
| TEC-04 | P0 | Criar estrutura de secoes reutilizaveis | Componentes de layout mais organizados para Home, Catalogo, Institucional e Contato | done |
| TEC-05 | P1 | Remover estilos inline criticos | Estilos principais migrados para componentes ou CSS estruturado | in_progress |
| TEC-06 | P1 | Avaliar migracao para Next.js | Decisao tecnica registrada com custo, risco e beneficio | todo |
| TEC-07 | P2 | Migrar para Next.js | Site com melhor SEO, performance e base para internacionalizacao | todo |
| TEC-08 | P0 | Criar API de produtos | Backend local com listagem, detalhe, criacao, edicao e remocao logica de produtos | done |
| TEC-09 | P0 | Criar persistencia inicial de produtos | Catalogo salvo em JSON para permitir evolucao dinamica sem mexer no front-end | done |
| TEC-10 | P0 | Criar area administrativa de produtos | Tela protegida por token para cadastrar novos derivados da cana-de-acucar | done |
| TEC-11 | P1 | Definir backend definitivo | Decidir entre manter Node, retomar Java/Spring ou migrar para CMS/headless | todo |

## Epic 2 - Identidade visual e design system

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| DS-01 | P0 | Confirmar cores oficiais da marca | Paleta validada mantendo a identidade atual | todo |
| DS-02 | P0 | Confirmar fontes oficiais da marca | Tipografia definida para titulos, textos e navegacao | todo |
| DS-03 | P0 | Criar guia visual inicial | Tokens, botoes, cards, formularios, header e rodape documentados | in_progress |
| DS-04 | P1 | Definir estilo fotografico | Direcao para imagens de produto, familia, producao e exportacao | todo |
| DS-05 | P1 | Padronizar CTAs | Botoes e chamadas consistentes para catalogo, contato e WhatsApp | in_progress |
| DS-06 | P2 | Criar biblioteca de componentes | Base reutilizavel para futuras paginas e campanhas | todo |

## Epic 3 - Conteudo e narrativa de marca

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| CNT-01 | P0 | Reescrever proposta principal da Home | Mensagem clara sobre produto, origem e diferencial | todo |
| CNT-02 | P0 | Reescrever textos institucionais | Historia da marca com tom mais profissional e humano | todo |
| CNT-03 | P0 | Estruturar conteudo do processo produtivo | Secao sobre producao artesanal, qualidade e cuidado | todo |
| CNT-04 | P0 | Criar textos do catalogo | Descricoes consistentes para linhas e produtos | todo |
| CNT-05 | P1 | Criar FAQ base | Perguntas sobre produtos, compra, contato, revenda e exportacao | todo |
| CNT-06 | P1 | Criar microcopy de formularios | Labels, mensagens de erro e sucesso com tom profissional | todo |
| CNT-07 | P2 | Preparar versoes em ingles e espanhol | Conteudo internacional revisado para exportacao | todo |

## Epic 4 - Home

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| HOM-01 | P0 | Criar novo hero | Primeira dobra moderna com produto real, mensagem forte e CTA | done |
| HOM-02 | P0 | Criar secao de linhas de produto | Licores, cachacas e edicoes especiais com hierarquia clara | done |
| HOM-03 | P0 | Criar secao de historia familiar | Bloco institucional com foto real e CTA para Institucional | done |
| HOM-04 | P1 | Criar secao de processo/qualidade | Sinais de confianca para consumidor e lojista | done |
| HOM-05 | P1 | Criar chamada para exportacao | Entrada clara para conversa B2B/internacional | done |
| HOM-06 | P1 | Substituir carrosseis amadores | Layout editorial responsivo e mais estavel | done |

## Epic 5 - Catalogo inteligente

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| CAT-01 | P0 | Estruturar dados dos produtos | Fonte unica com nome, categoria, sabor, volume, teor e descricao | done |
| CAT-02 | P0 | Criar grid de catalogo moderno | Listagem responsiva, escaneavel e orientada a produto | done |
| CAT-03 | P0 | Criar pagina de detalhe do produto | Foto, descricao, especificacoes e CTA | done |
| CAT-04 | P1 | Criar filtros do catalogo | Filtro por linha, sabor, volume e perfil | done |
| CAT-05 | P1 | Criar CTA de WhatsApp por produto | Mensagem pre-preenchida por produto/interesse | done |
| CAT-06 | P1 | Criar recomendador de sabores MVP | Perguntas simples e sugestoes de produtos | done |
| CAT-07 | P2 | Criar busca semantica | Busca por ocasiao, perfil e termos naturais | todo |
| CAT-08 | P1 | Adicionar upload de imagem no admin | Cadastro de fotos/rotulos sem precisar publicar arquivo manualmente | done |
| CAT-09 | P1 | Enriquecer ficha tecnica | Volume, teor alcoolico, embalagem, ingredientes e disponibilidade comercial | todo |

## Epic 6 - Exportacao e B2B

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| EXP-01 | P0 | Criar pagina Exportacao | Pagina B2B com origem, produtos, diferenciais e contato | done |
| EXP-02 | P0 | Definir informacoes comerciais permitidas | Lista do que pode aparecer publicamente | todo |
| EXP-03 | P1 | Criar formulario B2B/exportacao | Captura de empresa, pais, interesse e volume estimado | todo |
| EXP-04 | P1 | Criar CTA de contato comercial | Fluxo para WhatsApp/e-mail com contexto de exportacao | done |
| EXP-05 | P2 | Preparar catalogo PDF comercial | Material para distribuidores e compradores internacionais | todo |
| EXP-06 | P2 | Criar versao EN/ES da pagina | Pagina internacional revisada | todo |

## Epic 7 - Contato e leads

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| LED-01 | P0 | Redesenhar pagina de contato | Contato claro para consumidor, lojista e exportacao | done |
| LED-02 | P0 | Criar classificacao de lead | Campo de interesse com rotas de atendimento | done |
| LED-03 | P1 | Gerar mensagem inicial para WhatsApp | Texto montado automaticamente pelo interesse do usuario | done |
| LED-04 | P1 | Criar mensagem de sucesso | Confirmacao profissional apos envio | todo |
| LED-05 | P2 | Integrar CRM ou planilha | Leads centralizados para acompanhamento comercial | todo |
| LED-06 | P2 | Resumo automatico dos leads | IA resume contatos e prioridade de retorno | todo |

## Epic 8 - IA aplicada

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| IA-01 | P0 | Definir casos de uso do MVP | Lista fechada de IA para primeira versao | done |
| IA-02 | P0 | Definir limites de resposta | Regras para IA nao inventar preco, envio, certificacao ou disponibilidade | done |
| IA-03 | P1 | Criar camada de API para IA | Chaves protegidas fora do front-end | todo |
| IA-04 | P1 | Criar recomendador assistido | Recomendacao de produtos por preferencia | done |
| IA-05 | P1 | Criar FAQ controlado | Respostas baseadas em conteudo aprovado | todo |
| IA-06 | P2 | Criar assistente de atendimento | Chat/assistente com base de conhecimento | todo |
| IA-07 | P2 | Criar gerador de catalogo comercial | PDF ou texto comercial por publico/idioma | todo |

## Epic 9 - SEO, performance e qualidade

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| QLT-01 | P0 | Rodar build e corrigir erros | Build estavel para homologacao | done |
| QLT-02 | P0 | Revisar responsividade | Mobile e desktop sem quebras visuais | in_progress |
| QLT-03 | P1 | Configurar metatags e Open Graph | Compartilhamento e SEO basico melhorados | done |
| QLT-04 | P1 | Otimizar imagens | Assets leves sem perder qualidade relevante | done |
| QLT-05 | P1 | Revisar acessibilidade basica | Alt text, contraste, labels e navegacao | todo |
| QLT-06 | P2 | Adicionar analytics de conversao | Eventos de catalogo, contato, WhatsApp e exportacao | todo |
| QLT-07 | P1 | Remover segredos e dependencias legadas | Chaves removidas, runtime enxuto e audit de producao limpo | done |

## Epic 10 - Lancamento

| ID | Prioridade | Tarefa | Entrega esperada | Status |
| --- | --- | --- | --- | --- |
| LAN-01 | P0 | Criar ambiente de homologacao | Link para validacao da marca antes de publicar | todo |
| LAN-02 | P0 | Checklist de publicacao | Lista de conteudo, imagens, SEO, contato e age gate | todo |
| LAN-03 | P1 | Validar com a marca | Ajustes finais aprovados | todo |
| LAN-04 | P1 | Publicar nova versao | Site novo em producao | todo |
| LAN-05 | P2 | Medir pos-lancamento | Revisao de metricas e melhorias da primeira semana | todo |

## MVP recomendado

O MVP deve incluir:

- Novo layout global.
- Home reformulada.
- Catalogo estruturado com detalhes de produto.
- Pagina Institucional revisada.
- Pagina Exportacao.
- Pagina Contato com classificacao de lead.
- CTA de WhatsApp com mensagem pre-preenchida.
- Recomendador simples de sabores.
- Backend dinamico para produtos.
- Area administrativa inicial.
- SEO basico, responsividade e build estavel.

## Fora do MVP

- E-commerce completo com pagamento e frete.
- Chat IA completo conectado a base de conhecimento.
- Busca semantica avancada.
- CMS completo ou admin avancado com upload, usuarios e auditoria.
- CRM completo.
- Traducoes finais para ingles e espanhol, caso nao haja revisao humana disponivel.
