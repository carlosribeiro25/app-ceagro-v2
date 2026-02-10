# API CEASA - Sistema de Gerenciamento de Mercadorias

Uma API robusta e segura para gerenciamento de produtos e usuários, desenvolvida com Fastify, TypeScript e PostgreSQL. Ideal para plataformas de registro e recebimento de mercadorias.

## 📋 Sumário

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Executar](#como-executar)
- [Endpoints](#endpoints)
- [Autenticação](#autenticação)
- [Arquitetura](#arquitetura)
- [Scripts Disponíveis](#scripts-disponíveis)

## ✨ Características

- ✅ **Autenticação JWT** - Sistema seguro de login com tokens JWT
- ✅ **Controle de Roles** - Dois níveis de acesso: Client e Manager
- ✅ **Criptografia de Senhas** - Utiliza Argon2 para segurança máxima
- ✅ **Validação com Zod** - Validação robusta de tipos em tempo de execução
- ✅ **ORM Type-Safe** - Drizzle ORM com suporte completo a TypeScript
- ✅ **Documentação Automática** - Swagger/OpenAPI integrado
- ✅ **CORS Habilitado** - Suporte a requisições cross-origin
- ✅ **Testes Automatizados** - Suite completa com Vitest
- ✅ **Migrations** - Versionamento de banco de dados com Drizzle Kit

## 🔧 Requisitos

- **Node.js** >= 18.0.0
- **npm** ou **yarn**
- **PostgreSQL** >= 12
- **Git**

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd API-Ceasa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` (veja seção [Configuração](#configuração))

4. Execute as migrations do banco de dados:
```bash
npm run db:push
```

5. (Opcional) Popule o banco com dados de teste:
```bash
npm run db:seed
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados
DATABASE_URL=postgresql://usuario:senha@localhost:5432/ceasa

# Servidor
PORT=3000

# JWT
JWT_SECRET=sua_chave_secreta_muito_segura
```

### Variáveis de Ambiente Explicadas

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL de conexão com o PostgreSQL (formato: `postgresql://user:password@host:port/database`) |
| `PORT` | Porta em que o servidor será executado (padrão: 3000) |
| `JWT_SECRET` | Chave secreta para assinar e verificar tokens JWT |

## 🚀 Como Executar

### Ambiente de Desenvolvimento

Inicia o servidor em modo watch (recarrega automaticamente ao salvar):

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Produção

```bash
npm run start
```

### Acessar Documentação

A documentação interativa do Swagger estará disponível em:

```
http://localhost:3000/docs
```

## 📡 Endpoints

### 🔐 Autenticação

#### Login
```http
POST /login
Content-Type: application/json

{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

**Resposta (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 👥 Usuários

#### Criar Usuário
```http
POST /usuarios
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "11999999999",
  "password": "senha123",
  "role": "Client"
}
```

#### Listar Todos os Usuários
```http
GET /usuarios
Authorization: Bearer <token>
```

#### Buscar Usuário por ID
```http
GET /usuarios/:id
Authorization: Bearer <token>
```

#### Atualizar Usuário
```http
PATCH /usuarios/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva Santos",
  "telefone": "11988888888"
}
```

#### Substituir Usuário (PUT)
```http
PUT /usuarios/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "telefone": "11988888888",
  "role": "Manager"
}
```

#### Deletar Usuário
```http
DELETE /usuarios/:id
Authorization: Bearer <token>
```

---

### 📦 Produtos

#### Criar Produto
```http
POST /produtos
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Tomate",
  "QNT": "500kg",
  "D1": "Vermelho",
  "D2": "Fresco"
}
```

#### Listar Todos os Produtos
```http
GET /produtos
```

#### Buscar Produto por ID
```http
GET /produtos/:id
```

#### Atualizar Produto (PATCH)
```http
PATCH /produtos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "QNT": "600kg",
  "D1": "Vermelho intenso"
}
```

#### Substituir Produto (PUT)
```http
PUT /produtos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Tomate Caqui",
  "QNT": "500kg",
  "D1": "Vermelho",
  "D2": "Fresco"
}
```

#### Deletar Produto
```http
DELETE /produtos/:id
Authorization: Bearer <token>
```

---

## 🔐 Autenticação

### Tipos de Usuários (Roles)

| Role | Descrição |
|------|-----------|
| **Client** | Usuário comum - Acesso de leitura limitado |
| **Manager** | Gerenciador - Acesso completo para gerenciar produtos e usuários |

### Fluxo de Autenticação

1. **Login**: Envie email e senha para `/login`
2. **Receba Token**: Você receberá um JWT válido por um período determinado
3. **Use o Token**: Inclua o token no header `Authorization: Bearer <token>`
4. **Acesso Garantido**: Faça suas requisições com o token

### Exemplo de Requisição Autenticada

```bash
curl -X GET http://localhost:3000/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🏗️ Arquitetura

```
API-Ceasa/
├── src/
│   ├── app.ts                 # Configuração da aplicação Fastify
│   ├── server.ts              # Inicialização do servidor
│   ├── db/
│   │   ├── cliente.ts         # Conexão com banco de dados
│   │   ├── schema.ts          # Definição das tabelas (Drizzle ORM)
│   │   └── seed.ts            # Dados iniciais
│   ├── routes/
│   │   ├── login.ts           # Endpoints de autenticação
│   │   ├── usuarios/          # Endpoints de usuários
│   │   ├── produtos/          # Endpoints de produtos
│   │   ├── hooks/             # Middleware JWT e verificação de roles
│   │   └── tests/             # Testes das rotas
│   ├── utils/
│   │   └── atentication.ts    # Utilitários de autenticação
│   └── factory/
│       └── makeUser.ts        # Factory para criação de usuários
├── drizzle/                   # Migrations do banco
├── package.json               # Dependências
├── tsconfig.json              # Configuração TypeScript
├── biome.json                 # Configuração do formatter
├── drizzle.config.ts          # Configuração do Drizzle ORM
└── vitest.config.ts           # Configuração dos testes
```

---

## 📊 Diagrama da Arquitetura

```mermaid
graph TB
    subgraph Client["Cliente"]
        WEB["🌐 Navegador/Postman"]
    end
    
    subgraph Server["Servidor Fastify"]
        SERVER["Servidor HTTP<br/>Port 3000"]
        JWT["🔐 JWT Middleware"]
        ROLES["👥 Verificador de Roles"]
    end
    
    subgraph Routes["Rotas da API"]
        AUTH["🔑 Autenticação<br/>/login"]
        USUARIOS["👨 Usuários<br/>/usuarios"]
        PRODUTOS["📦 Produtos<br/>/produtos"]
    end
    
    subgraph Core["Lógica da Aplicação"]
        VALIDATION["✔️ Validação Zod"]
        BUSINESS["💼 Regras de Negócio"]
        CRYPT["🔒 Argon2/JWT"]
    end
    
    subgraph Database["Banco de Dados"]
        DB["🐘 PostgreSQL"]
        DRIZZLE["📝 Drizzle ORM"]
    end
    
    WEB -->|HTTP Request| SERVER
    SERVER --> JWT
    JWT --> ROLES
    ROLES --> AUTH
    ROLES --> USUARIOS
    ROLES --> PRODUTOS
    
    AUTH --> VALIDATION
    USUARIOS --> VALIDATION
    PRODUTOS --> VALIDATION
    
    VALIDATION --> BUSINESS
    BUSINESS --> CRYPT
    
    CRYPT --> DRIZZLE
    DRIZZLE --> DB
    
    DB -->|Dados| DRIZZLE
    DRIZZLE -->|Resultado| SERVER
    SERVER -->|JSON Response| WEB
```

---

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia servidor em modo watch

# Banco de Dados
npm run db:generate           # Gera migrations baseada no schema
npm run db:migrate            # Executa as migrations pendentes
npm run db:push               # Envia schema para o banco (desenvolvimento)
npm run db:studio             # Abre interface visual do banco
npm run db:seed               # Popula o banco com dados de teste

# Build e Produção
npm run start                  # Inicia servidor em produção
npm run build                  # Compila o projeto

# Qualidade de Código
npm run format                 # Formata o código com Biome

# Testes
npm test                      # Executa suite de testes
npm run test:coverage         # Executa testes com cobertura
```

---

## 📊 Modelo de Dados

### Tabela: users
| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR | NOT NULL, min 4 caracteres |
| email | VARCHAR | NOT NULL, UNIQUE |
| telefone | VARCHAR | NOT NULL |
| password | VARCHAR | NOT NULL (hash Argon2) |
| role | ENUM | NOT NULL, DEFAULT 'Client' (Client ou Manager) |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT now() |

### Tabela: produtos
| Campo | Tipo | Restrições |
|-------|------|-----------|
| id | INTEGER | PRIMARY KEY, AUTO_INCREMENT |
| name | VARCHAR | NOT NULL, min 4 caracteres |
| QNT | VARCHAR | OPTIONAL |
| D1 | VARCHAR | OPTIONAL |
| D2 | VARCHAR | OPTIONAL |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT now() |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| **Fastify** | 5.7.0 | Framework web rápido e eficiente |
| **TypeScript** | 5.9.3 | Linguagem fortemente tipada |
| **PostgreSQL** | 8.17.1 | Banco de dados relacional |
| **Drizzle ORM** | 0.45.1 | ORM type-safe para TypeScript |
| **Zod** | 4.3.5 | Validação de schemas |
| **JWT** | 9.0.3 | Autenticação com tokens |
| **Argon2** | 0.44.0 | Hash seguro de senhas |
| **Vitest** | 4.0.18 | Framework de testes |

---

## 📝 Exemplo de Fluxo Completo

### 1. Criar um novo usuário
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Silva",
    "email": "maria@exemplo.com",
    "telefone": "11987651234",
    "password": "senha_segura_123",
    "role": "Client"
  }'
```

### 2. Fazer login
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@exemplo.com",
    "password": "senha_segura_123"
  }'

# Resposta:
# {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
```

### 3. Usar o token para criar um produto
```bash
curl -X POST http://localhost:3000/produtos \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maçã Gala",
    "QNT": "200kg",
    "D1": "Vermelha",
    "D2": "Doce"
  }'
```

### 4. Listar produtos
```bash
curl -X GET http://localhost:3000/produtos
```

---

## 🐛 Troubleshooting

### Erro: `DATABASE_URL is required`
**Solução**: Certifique-se de que o arquivo `.env` existe e contém a variável `DATABASE_URL`

### Erro: `ECONNREFUSED` ao conectar com PostgreSQL
**Solução**: Verifique se o PostgreSQL está rodando e se a URL de conexão está correta

### Erro: Token JWT inválido
**Solução**: Certifique-se de que incluiu o token no header com o formato correto: `Authorization: Bearer <token>`

### Erro: `role` does not exist on type 'string'
**Solução**: Certifique-se de que o middleware de autenticação está corretamente tipado no arquivo de hooks

---

## 📧 Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório ou entre em contato com o time de desenvolvimento.

---

## 📄 Licença

Este projeto está licenciado sob a licença ISC - veja o arquivo LICENSE para mais detalhes.

