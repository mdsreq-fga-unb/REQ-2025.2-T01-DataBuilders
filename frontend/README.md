# Frontend – DataBuilders

Este diretório contém o código-fonte do frontend do projeto DataBuilders, construído com React + Vite + TypeScript.

## 🚀 Primeiros passos

```bash
# Instale as dependências
npm install

# Rode a aplicação de desenvolvimento
npm run dev
```
Acesse http://localhost:5173 no navegador.

## 🗂️ Estrutura das pastas

```
src/
  assets/      # Imagens, ícones, fontes, etc.
  components/  # Componentes reutilizáveis (botões, cards, modais...)
  pages/       # Páginas completas (Home, Login, Admin, etc.)
  layouts/     # Layouts que envolvem páginas (Navbar, Sidebar, Footer)
  routes/      # Rotas do app (React Router ou config personalizada)
  hooks/       # Hooks personalizados
  context/     # Contextos globais (autenticação, tema, etc.)
  services/    # Chamadas à API, integrações, etc.
  utils/       # Funções utilitárias (formatadores, validadores)
  types/       # Tipos TypeScript globais
  styles/      # Estilos globais, Tailwind/config, variáveis CSS
  main.tsx     # Ponto de entrada
  App.tsx      # Componente principal
```

## 📦 Principais dependências
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 🎯 Padrões e boas práticas
- Siga a estrutura de pastas proposta.
- Prefira componentes reutilizáveis.
- Utilize `types/` para definir tipos globais.
- Coloque estilos globais em `styles/global.css`.

## 🤝 Contribuindo
1. Crie uma branch para sua feature/correção.
2. Siga os padrões de commit convencionais.
3. Abra um Pull Request bem descritivo.

## 📝 Observações
- Mantenha este README atualizado sempre que estrutura ou dependências mudarem!
- Para dúvidas gerais do projeto, consulte o README da raiz do repositório.
