# Data Builders

![License](https://img.shields.io/badge/license-MIT-green)

**Data Builders** é um projeto acadêmico da Universidade de Brasília, criado para desenvolver uma plataforma web que centraliza materiais didáticos e facilita a comunicação entre professor e alunos da disciplina de Estruturas de Dados 2.

O objetivo principal é oferecer ao professor uma ferramenta que seja intuitiva, autônoma e que melhore a experiência de aprendizado dos alunos, centralizando informações e exemplos de algoritmos em múltiplas linguagens.

## 🔹 Visão Geral

- **Cliente:** Professor Maurício Serrano (UnB, FCTE)  
- **Público-alvo:** Alunos da disciplina Estruturas de Dados 2  
- **Problema:** Fragmentação das ferramentas de ensino (Moodle, GitHub, e-mail, Telegram) e dificuldade na centralização de materiais.  
- **Solução:** Plataforma web que permite postagem simplificada de materiais, acesso fácil aos alunos e apresentação de algoritmos em múltiplas linguagens.

## 🔹 Funcionalidades

- Autonomia completa para o professor gerenciar sua página.  
- Upload e distribuição de materiais em múltiplos formatos.  
- Exibição de exemplos de algoritmos em diversas linguagens.  
- Interface intuitiva para alunos encontrarem rapidamente o conteúdo necessário.  
- Pesquisa rápida de projetos e materiais.

## 🔹 Tecnologias

- **Frontend:** React
- **Backend:** Node.js  
- **Banco de dados:** MongoDB  
- **Documentação:** MkDocs

---

## 🔹 Estrutura do Projeto MkDocs 📂
- 
```text
📁 data-builders-docs/
├─ 📁 docs/                         # Pasta com todos os arquivos de documentação
│  ├─ 🏠 index.md                    # Página inicial da documentação
│  ├─ 📄 cenario-atual.md            # Cenário atual do cliente
│  ├─ 📄 solucao-proposta.md         # Solução proposta
│  ├─ 📄 estrategia-software.md      # Estratégias de engenharia de software
│  ├─ 📄 cronograma-entregas.md      # Cronograma e entregas
│  ├─ 📄 interacao-equipe.md         # Interação da equipe e com o cliente
│  ├─ 📄 licoes-aprendidas.md        # Lições aprendidas do projeto
│  └─ 📄 referencias.md              # Referências bibliográficas
├─ ⚙️ mkdocs.yml                     # Configuração do MkDocs (tema, navegação, plugins)
└─ 📘 README.md                      # README do projeto
```
---

- `docs/` → Contém todos os arquivos Markdown da documentação.  
- `mkdocs.yml` → Configuração do site MkDocs, tema, navegação e plugins.

## 🔹 Como rodar localmente

1. Clonar o repositório:
```bash
git clone https://github.com/SEU-USUARIO/REQ-2025.2-T01-DataBuilders.git
```

2. Instalar MkDocs e tema Material:
```bash
pip install mkdocs mkdocs-material
```

3. Rodar o site localmente:
```bash 
mkdocs serve
```
4. Acesse http://127.0.0.1:8000 para visualizar o site.

## 🔹 Deploy no GitHub Pages

Para publicar a documentação:
```bash
mkdocs gh-deploy
```
- Cria/atualiza a branch gh-pages automaticamente

- Site publicado em: https://mdsreq-fga-unb.github.io/REQ-2025.2-T01-DataBuilders/

## 🔹 Contribuição

Este projeto é acadêmico, mas se você quiser contribuir:

1. Faça um fork do repositório

2. Crie uma branch para sua feature ou correção (git checkout -b minha-feature)

3. Faça commit das suas alterações (git commit -m "Descrição do commit")

4. Faça push para sua branch (git push origin minha-feature)

5. Abra um Pull Request descrevendo suas alterações

    Certifique-se de seguir o padrão de documentação e organizar os arquivos .md na pasta docs/.

## 🔹 Links Rápidos
- [Cenário atual do cliente](visao_produto/cenario.md)
- [Solução proposta](visao_produto/solucao.md)
- [Estratégias de Software](visao_produto/estrategias.md)
- [Cronograma e Entregas](visao_produto/cronograma.md)
- [Interação da Equipe e Cliente](visao_produto/interacao.md)
- [Lições aprendidas](visao_produto/licoes.md)
- [Referências](visao_produto/referencias.md)