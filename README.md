# 🛒 App Lista de Compras (Back-end)

Este é o back-end de uma **Lista de Compras**, desenvolvido como uma **API REST** utilizando **Node.js** e **MongoDB**, com arquitetura **MVC** (Model-View-Controller). Ele foi projetado para ser consumido por um projeto de front-end separado, podendo ser facilmente integrado a um **Web App Progressivo (PWA)**.

## 🧠 O que é esse projeto?

Este projeto é uma **API para gerenciamento de listas de compras**, onde você pode:

- Criar novas listas de compras;
- Adicionar, editar e remover itens;
- Atualizar status de compra;
- Excluir listas completas.

O sistema é escalável e pronto para ser integrado com qualquer aplicação front-end moderna, seja web ou mobile.

## 🛠️ Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript;
- **Express** – Framework minimalista para construção da API;
- **MongoDB** – Banco de dados NoSQL;
- **Mongoose** – ODM para MongoDB;
- **Arquitetura MVC** – Separação de responsabilidades;
- **JWT** - Tokenrizando a aplicação;
- **Dotenv** – Gerenciamento de variáveis de ambiente;
- **Cors** – Habilitação de requisições entre diferentes domínios;
- **PWA (Progressive Web App)** – Este repositório oferece a API para ser consumida por uma aplicação PWA no front-end.

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js e npm instalados
- MongoDB instalado e rodando localmente ou conexão com uma instância na nuvem (ex: MongoDB Atlas)

### Passos para rodar:

```bash
# Clone o repositório
git clone https://github.com/Matheusbzrr/app-lista-compras.git

# Acesse a pasta
cd app-lista-compras

# Instale as dependências
npm install

# Crie um arquivo .env com as variáveis:
# Exemplo de conteúdo:
# SECRET= (sua chave secreta" 
# MONGO_URI=mongodb://seulinkdobanco/nome-do-banco
# PORT=(Sua porta)

# Inicie o servidor
npm start
````

("📁 Estrutura do Projeto", """```
src/
├── config/        # Arquivos de configuração (ex: banco de dados, ambiente)
├── controllers/   # Lógica das requisições HTTP
├── dtos/          # Objetos de Transferência de Dados
├── middlewares/   # Intermediários para tratamento de requisições
├── model/         # Modelos de dados do Mongoose
├── repository/    # Acesso aos dados e regras de negócio
├── routes/        # Definições das rotas da API
├── services/      # Regras de negócio e funcionalidades principais
```"""),

    ("🌐 Consumo da API", """Essa API foi criada para ser consumida por um projeto de front-end (por exemplo, um **PWA**), onde a interface gráfica será responsável por interagir com os dados da API.""")
