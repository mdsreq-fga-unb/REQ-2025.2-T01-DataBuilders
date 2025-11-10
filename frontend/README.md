# Frontend – DataBuilders

Aplicação React responsável pelas interfaces do sistema de gestão acadêmica **DataBuilders**. O projeto foi criado com [Vite](https://vitejs.dev/) e utiliza **TypeScript**, **React Router DOM** e **Bootstrap** (grid) combinado com **CSS Modules**.

---

## 🔧 Pré-requisitos

- [Node.js](https://nodejs.org/) **>= 18** (recomendado: LTS mais recente)
- [npm](https://www.npmjs.com/) **>= 9** (instalado com o Node)

Verifique as versões instaladas:

```bash
node --version
npm --version
```

---

## 🚀 Como executar localmente

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor de desenvolvimento
npm run dev
```

- A aplicação ficará disponível em `http://localhost:5173`.
- O Vite aplica **hot module replacement (HMR)** automaticamente sempre que arquivos `tsx`/`css` são salvos.

---

## 📦 Scripts disponíveis

| Comando            | Descrição                                                                 |
| ------------------ | ------------------------------------------------------------------------- |
| `npm run dev`      | Sobe o servidor de desenvolvimento com HMR.                               |
| `npm run build`    | Gera build de produção (`/dist`). Executa `tsc -b` antes de empacotar.     |
| `npm run preview`  | Serve a build gerada localmente para conferência.                         |
| `npm run lint`     | Roda o ESLint em todo o projeto (configuração baseada em ESLint v9).      |

> Não há testes automatizados configurados neste momento.

---

## 🗂️ Estrutura das pastas (`src/`)

```
assets/        # Imagens, ícones, SVGs e outros arquivos estáticos
components/    # Componentes reutilizáveis organizados por domínio (home, materials, etc.)
context/       # Contextos globais (ex.: autenticação futura)
hooks/         # Hooks personalizados
layouts/       # Layouts que envolvem páginas (DefaultLayout, etc.)
pages/         # Páginas completas (Home, Materiais, Repositórios, Avisos, Perfil, Dashboard)
routes/        # Definição de rotas via React Router
services/      # Camada para futuras integrações com APIs/backends
styles/        # Estilos globais; CSS Modules ficam junto aos componentes
types/         # Tipos TypeScript compartilhados
utils/         # Helpers e utilitários
main.tsx       # Ponto de entrada React
App.tsx        # Setup das rotas e layout base
```

- Cada componente possui um arquivo `.tsx` e um `.module.css`, garantindo escopo local de estilo.
- Ícones SVG são importados diretamente ou via `assets/`.

---

## 🧩 Principais dependências

- `react` e `react-dom` (v19)
- `react-router-dom` (v7)
- `bootstrap` (v5) – utilizado apenas para o grid responsivo
- `typescript` (v5.9) + `@types/*`
- `vite` (v7) e `@vitejs/plugin-react`
- `eslint` (v9) com `typescript-eslint`

---

## 🛠️ Convenções e dicas

- Utilize **Bootstrap Grid** (`row`, `col-*`) para todas as seções, conforme os protótipos.
- Prefira criar componentes em `components/<domínio>/` para facilitar reuso.
- Estilos específicos devem ficar em `*.module.css`; valores compartilhados podem usar CSS custom properties (variáveis).
- Ao adicionar novas páginas, exporte-as em `pages/index.tsx` e registre a rota correspondente em `App.tsx`.

---

## 🧹 Manutenção

- Após adicionar dependências, atualize este README se necessário.
- Rodar `npm run lint` antes de abrir PRs ajuda a evitar falhas triviais.
- Para mais contexto sobre o produto e protótipos, consulte a pasta `docs/`.

---

## ❓ Suporte

Em caso de dúvidas gerais sobre arquitetura ou fluxos, procure o README principal na raiz do repositório ou entre em contato com a equipe DataBuilders.
