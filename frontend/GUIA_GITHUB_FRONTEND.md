# 🚀 Guia para Subir APENAS a Pasta Frontend para o GitHub

## Opção 1: Repositório Git DENTRO da pasta frontend

### Passo a Passo:

```bash
# 1. Entrar na pasta frontend
cd frontend

# 2. Inicializar o Git
git init

# 3. Adicionar o remote (SUBSTITUA SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/REQ-2025.2-T01-DataBuilders-frontend.git

# 4. Adicionar todos os arquivos
git add .

# 5. Fazer o commit
git commit -m "feat: implementação completa do frontend - telas de login, gestão de conteúdos, repositórios e avisos"

# 6. Renomear branch para main (se necessário)
git branch -M main

# 7. Fazer push
git push -u origin main
```

---

## Opção 2: Repositório na raiz, mas commitando apenas frontend

Se você já tem um repositório na raiz do projeto:

```bash
# Na raiz do projeto
git init

# Adicionar apenas a pasta frontend
git add frontend/

# Adicionar também arquivos importantes da raiz (opcional)
git add README.md
git add .gitignore
git add CHANGELOG.md

# Commit
git commit -m "feat: implementação completa do frontend"

# Adicionar remote
git remote add origin https://github.com/SEU-USUARIO/REQ-2025.2-T01-DataBuilders.git

# Push
git branch -M main
git push -u origin main
```

---

## ⚠️ Importante - Verificar antes de fazer push

### Verificar o que será commitado:

```bash
# Ver status
git status

# Ver arquivos que serão commitados
git ls-files
```

### Certifique-se que node_modules NÃO será commitado:

O arquivo `frontend/.gitignore` já deve ter `node_modules` listado. Se não tiver, adicione:

```
node_modules/
dist/
.vite/
```

---

## 📋 Comandos Rápidos (Opção 1 - Recomendada)

```bash
cd frontend
git init
git remote add origin https://github.com/SEU-USUARIO/REQ-2025.2-T01-DataBuilders-frontend.git
git add .
git commit -m "feat: implementação completa do frontend"
git branch -M main
git push -u origin main
```

---

## 🔍 Verificar se node_modules está sendo ignorado

```bash
# Dentro da pasta frontend
git status

# Se node_modules aparecer, adicione ao .gitignore
echo "node_modules/" >> .gitignore
echo "dist/" >> .gitignore
echo ".vite/" >> .gitignore
```

---

## ✅ Depois do primeiro push

Para atualizar o repositório no futuro:

```bash
cd frontend  # Se usar Opção 1
git add .
git commit -m "descrição das mudanças"
git push
```

