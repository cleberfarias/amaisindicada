# 🥃 A Mais Indicada – Site Institucional & Loja Online

> Plataforma digital para apresentação da marca **A Mais Indicada** e venda de cachaças e licores artesanais produzidos em Santa Catarina.

---

## 🎯 Sobre o projeto

Este projeto é o **site oficial** e a **loja online** da marca **A Mais Indicada**, uma cachaçaria artesanal catarinense que produz cachaças e licores com mão de obra familiar e foco em qualidade. [oai_citation:0‡Instagram](https://www.instagram.com/maisindicada/?hl=en&utm_source=chatgpt.com)  

O objetivo principal do sistema é:

- Fortalecer a **presença digital** da marca;
- Apresentar a **história, o processo produtivo e o catálogo de produtos**;
- Permitir que clientes conheçam melhor a marca e encontrem os canais de compra.

> Este repositório representa a parte **front-end** do projeto (site e/ou loja).  
> O back-end (cadastro de produtos, pedidos, etc.) foi desenvolvido separadamente, utilizando **Java Spring Boot + PostgreSQL**.

---

## 🎯 Objetivos de negócio

- Dar uma identidade digital profissional para a marca **A Mais Indicada**;
- Facilitar o acesso às informações sobre:
  - Tipos de cachaça e licores;
  - Origem e história da marca;
  - Pontos de venda e contato;
- Criar uma base sólida para futura expansão de **vendas online** e campanhas de marketing.

---

## 🧩 Funcionalidades principais

Adapte de acordo com o que existe hoje no seu código:

- **Página inicial (Home)**
  - Apresentação da marca com destaque visual;
  - Seção de produtos em destaque;
  - Chamadas para conhecer a história e os licores/cachaças.

- **Catálogo de produtos**
  - Listagem de cachaças e licores;
  - Informações de cada produto (nome, tipo, teor alcoólico, descrição, volume, etc.);
  - Espaço para fotos de alta qualidade.

- **Página “Sobre / Nossa História”**
  - História da marca e da família produtora;
  - Região e tradição na produção de cachaça artesanal.

- **Contato**
  - Formulário de contato (nome, e-mail, mensagem);
  - Links para redes sociais (Instagram, Facebook, etc.);
  - Informações de localização e canais de atendimento.

- **(Opcional) Carrinho / Loja**
  - Visualização de produtos selecionados;
  - Cálculo básico de valores;
  - Integração com back-end ou redirecionamento para canais de venda.

---

## 🏗️ Stack técnica

> Ajuste se algo não bater com o que está no seu código.

- **Front-end**
  - React (Create React App)
  - JavaScript (ES6+)
  - HTML5 / CSS3
  - Bootstrap / CSS customizado

- **Back-end (projeto separado)**
  - Java Spring Boot
  - PostgreSQL
  - API REST para produtos e, futuramente, pedidos

- **Outros**
  - Git / GitHub para versionamento
  - Deploy em ambiente web (ex: servidor próprio ou serviço de hospedagem)

---

## 🧱 Arquitetura e Organização

Sugestão de descrição (ajuste com o que o repo realmente tem):

```text
src/
  components/
    Header/
    Footer/
    ProductCard/
    ProductList/
    HeroSection/
    AboutSection/
    ContactForm/
  pages/
    Home/
    Produtos/
    Sobre/
    Contato/
  services/
    api.js        # Módulo de acesso à API (produtos, etc.)
  assets/
    images/
    icons/
  styles/
    global.css
    variables.css
  App.js
  index.js