# Aplicação de Autenticação com JWT e MongoDB

Esta é uma aplicação em estágio inicial que oferece a funcionalidade de login, utilizando **JSON Web Tokens (JWT)** para autenticação e **MongoDB** como banco de dados. A aplicação tem como objetivo fornecer um sistema de login seguro, onde o usuário pode se autenticar e obter um token de acesso para interações subsequentes.

## Funcionalidades

- **Cadastro de Usuário**: (Planejado para versões futuras)
- **Login com JWT**: Usuários podem fazer login fornecendo suas credenciais (usuário e senha).
- **Autenticação com Token JWT**: Após um login bem-sucedido, o usuário recebe um token JWT que pode ser usado para acessar rotas protegidas.
- **Banco de Dados MongoDB**: A aplicação utiliza MongoDB para armazenar dados de usuários.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de JavaScript no backend.
- **Express.js**: Framework para criação da API RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenamento dos dados de usuários.
- **Mongoose**: ODM (Object Data Modeling) para interagir com MongoDB.
- **JWT (JSON Web Token)**: Padrão aberto para autenticação segura entre cliente e servidor.

## Como Rodar a Aplicação

### Pré-requisitos

Antes de rodar a aplicação, é necessário ter instalado:

- **Node.js** (versão >= 14)
- **MongoDB** (local ou Atlas)

### Passos para Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as dependências**:
   No diretório do projeto, execute o comando:
    ```bash
   npm install
   ```

3. **Configuração do MongoDB**:
   Certifique-se de ter uma instância do MongoDB rodando. Caso esteja usando o MongoDB Atlas, crie um cluster e obtenha a URL de conexão.

4. **Variáveis de Ambiente**:
   Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
   
   MONGO_URI=coloque_sua_url_do_mongodb_aqui
   JWT_SECRET=sua_chave_secreta_para_jwt
   PORT=3000

5. **Rodando a aplicação**:

   ```bash
   node server.js
   ```










   
  
