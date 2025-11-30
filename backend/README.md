# Frontend – DataBuilders

Abaixo segue as instruções para rodar o backend do projeto e conectar ao banco de dados no Supabase.

```bash
# 1. Entrar na pasta do backend
cd /caminho/do/projeto/frontend

# 2. Instalar todas as dependências
npm install

# 3. Variáveis de ambiente
cp .env.example .env
# É preciso subsituir [YOUR_PASSWORD] pela senha do DB no arquivo .env

# 4. Gerar migrations localmente
docker run --name pg-dev \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_USER=user \
  -e POSTGRES_DB=data_builders \
  -p 5432:5432 -d postgres:15

# 5. Exportar DATABASE_URL local e gerar e aplicar migration local
export DATABASE_URL="postgresql://user:pass@localhost:5432/data_builders?schema=public"

npx prisma migrate dev --name init

# 6. Ajustar DATABASE_URL para a URL do Supabase e aplicar migrations
export DATABASE_URL="postgresql://postgres:SUPA_PASS@db...supabase.co:5432/postgres?sslmode=require"
# É preciso subsituir SUPA_PASS pela senha do DB no arquivo .env
npx prisma migrate deploy

# 7. Gerar Prisma Client
npx prisma generate

# 8. Rodar o projeto
npm run dev
```
