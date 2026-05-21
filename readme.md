# TF - DW - Aula 12 — Middlewares, Segurança e Swagger

Resumo da solução entregue para a atividade da Aula 12.

**O que foi implementado**
- **Middleware de log**: arquivo [app/Http/Middlewares/LogMiddleware.js](app/Http/Middlewares/LogMiddleware.js) que registra cada requisição no formato:
  - `[ISO] METODO :: ROTA` (ex: `[2026-05-21T14:30:00.000Z] GET :: /courses`).
  - Logs são exibidos via `console.log` e gravados em `storage/logs/log.txt`.
- **Documentação Swagger**: arquivo [docs/Course.json](docs/Course.json) com especificação OpenAPI para o resource `Course`. O Swagger é carregado pela aplicação em `/docs` via [app/Http/SwaggerDoc.js](app/Http/SwaggerDoc.js).

Arquivos principais alterados/criados
- [app/Http/Middlewares/LogMiddleware.js](app/Http/Middlewares/LogMiddleware.js)
- [docs/Course.json](docs/Course.json)

Como executar localmente
1. Instale dependências:

```bash
cd "c:/Users/andri/OneDrive/Documentos/TF Middlewares/unifaat-2026-dw-project"
npm install
```

2. Copie o arquivo de exemplo de ambiente e ajuste as variáveis se necessário:

```powershell
Copy-Item .env.example .env
# Edite .env e defina NODE_WEB_PORT (por ex. 3000) e credenciais do DB se usar o banco
```

3. Inicie o servidor:

```bash
npm start
```

4. Acesse a documentação Swagger (ex: se `NODE_WEB_PORT=3000`):

```
http://localhost:3000/docs
```

Testes rápidos (exemplos)
- Listar cursos:

```bash
curl http://localhost:3000/courses
```

- Criar curso:

```bash
curl -X POST http://localhost:3000/courses -H "Content-Type: application/json" -d '{"name":"Algoritmos","professor":"Dr. X"}'
```

Ver logs
- Os logs de requisição são gravados em `storage/logs/log.txt` e também aparecem no console do servidor.

Como subir para um novo repositório no GitHub
1. Crie um novo repositório no GitHub (por ex. `YOUR_USERNAME/unifaat-2026-dw-project-yourname`).
2. No terminal local do projeto execute:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Observações finais
- O middleware de log não interrompe o fluxo: sempre chama `next()`.
- A especificação em `docs/Course.json` reflete as rotas implementadas nos controllers de `app/Http/Controllers/CourseApi`.

Se quiser, eu posso:
- criar o repositório no seu GitHub (preciso de um token com permissões), ou
- executar o `git push` se você me informar a URL do repo.
# Projeto Desenvolvimento Web - Bimestre 2

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

---

## ⚙️ Configuração da Aplicação

1. Clonar o repositório:

```sh
git clone https://github.com/luan-tavares/unifaat-2026-dw-project
```

2. Entrar na pasta do projeto:

```sh
cd unifaat-2026-dw-project
```

3. Instalar as dependências:

```sh
npm install
```

4. Copiar o arquivo `.env` (**escolha apenas um, dependendo do seu sistema**):

Linux / Mac:
```sh
cp .env.example .env
```

Windows (CMD):
```sh
copy .env.example .env
```

5. Editar o arquivo `.env` e definir a senha do banco (**ALTERE AQUI**):

```env
POSTGRES_HOST=localhost
POSTGRES_DB=unifaat_dw
POSTGRES_PORT=6789
POSTGRES_USER=unifaat_user
POSTGRES_PASSWORD=**COLOQUE_SUA_SENHA_AQUI**

NODE_WEB_PORT=3000
```

---

## 🚀 Servidor Backend Node

6. Iniciar o servidor:

```sh
node _web.js
```

O servidor estará disponível em: http://localhost:3000

---

## 🐳 Docker

Após configurar o `.env`, basta subir os containers:

```sh
docker compose up
```

O servidor web estará disponível em: http://localhost:8080

---

## 🔄 Nodemon (Opcional)

Para desenvolvimento com reload automático:

Global:
```sh
npm install -g nodemon
nodemon _web.js
```

Local:
```sh
npm install --save-dev nodemon
./node_modules/.bin/nodemon _web.js
```

---

## 🧭 Estrutura do Projeto

- `app/`
  - Regras de negócio da aplicação.
  - `app/Controllers/`: controllers que tratam as rotas.

- `bootstrap/`
  - Inicialização da aplicação.
  - `app.js` e `config.js`.

- `config/`
  - Arquivos de configuração.

- `database/`
  - Conexões com banco de dados.
  - `database/connections/`: conexão com Postgres.

- `docker/`
  - Configurações de containers.
  - `docker/postgres/init`: scripts de inicialização do banco.

- `public/`
  - Arquivos estáticos.

- `routes/`
  - Definição das rotas HTTP.

- `storage/`
  - Armazenamento de arquivos/dados.

- `_web.js`
  - Entrypoint da aplicação.

- `.env`
  - Variáveis de ambiente.

- `.env.example`
  - Exemplo de variáveis.

- `docker-compose.yml`
  - Orquestração dos containers.

- `package.json`
  - Dependências e scripts.

---

## 📦 Containers Docker

| Container           | Host            | Porta Interna | Porta Externa (localhost) |
|--------------------|-----------------|---------------|---------------|
| postgres-container | postgres_host   | 5432          | 6789          |
| nginx-container | nginx-container   | 80          | 8080          |
| nodeweb-container | nodeweb_host   | 3000          | -         |