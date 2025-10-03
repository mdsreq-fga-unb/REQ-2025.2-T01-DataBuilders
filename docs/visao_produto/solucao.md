# SOLUÇÃO PROPOSTA

## Objetivos do Produto

### Objetivo geral
Apresentar ao professor uma ferramenta que seja acessível aos alunos e acomode todo o material didático necessário à disciplina, assim garantindo a melhoria e unificação das diversas plataformas de comunicação que atualmente usa.  

### Objetivos específicos e indicadores

| Código | Objetivo específico | Indicador de sucesso |
|--------|-------------------|--------------------|
| OE1    | Assegurar que o professor mantenha autonomia sobre sua própria página e evitar erros de disponibilidade. | Menos problemas técnicos, por parte do professor, e alunos relatarão menos dificuldade de encontrar materiais. |
| OE2    | Simplificar a postagem de material e reduzir os atrasos no fornecimento de conteúdo aos alunos. | Reduzir as etapas para um aluno encontrar o material e acessá-lo. |
| OE3    | Garantir a integridade do material e adequação ao método didático do professor, junto à apresentação de códigos exemplares para projetos da disciplina | Materiais completos, corretos e atualizados, utilizados e pelo professor conforme seu método de ensino |

## Características da Solução

- **Autonomia e manutenção da página (OE1):** o sistema a ser produzido garantirá que o professor tenha total controle sobre a plataforma e que não será dependente das diretrizes de terceiros.  
- **Simplificar postagem e distribuição de materiais (OE2):** o processo de postagem dos materiais pelo professor e a procura deles pelos alunos, serão feitos com o mínimo de etapas possíveis, evitando o abandono de engajamento.  
- **Integridade e adequação dos materiais (OE3):** as interfaces serão intuitivas tanto para o cadastro dos materiais quando para a visualização, garantindo que a atualização e o acesso sejam feitos rapidamente. Além disso, a solução irá aceitar diferentes formatos de materiais para se adequar ao estilo do professor.  
- **Aprendizado eficiente através de múltiplas linguagens (OE3):** o sistema contará com uma área dedicada à apresentação dos algoritmos ensinados na disciplina, mostrando suas possíveis aplicações e a diversidade de linguagens que podem ser utilizadas.  

## Pesquisa de Mercado e Análise Competitiva

No momento, há alguns sistemas que possuem competência similar à da plataforma planejada. Canvas LMS e o próprio Moodle são excelentes exemplos de competidores que já são muito bem estabelecidos nesse mercado. Porém, ambos apresentam uma carência no aspecto de "personalização".  

Embora ambos os sistemas possuam uma boa capacidade de personalização, nenhum é capaz de realizar chamadas de APIs externas, sem possuir permissão de administrador (a qual o nosso cliente não possui nem no Moodle).  

O Professor Maurício deseja que haja uma forma rápida e fácil para pesquisar os projetos da disciplina, que não seja só pelo nome do repositório deles. E é solucionando essa questão que o produto se diferencia dos demais, pois não só consegue-se atender às necessidades do cliente, como é possível atender aos seus desejos.  

## Análise de Viabilidade

A viabilidade técnica do projeto é considerada alta, visto que a equipe possui experiência prévia nas tecnologias que serão utilizadas, como React, Node.js e TypeScript. No que se refere ao banco de dados, a equipe possui menor experiência com as tecnologias em análise para uso no projeto (PostgreSQL ou MongoDB). Apesar disso, a curva de aprendizado não é considerada um impeditivo, pois a equipe já tem conhecimento sólido na área.  

A integração com a API do GitHub para busca de repositórios por nome, linguagem e palavras-chave no README será viável utilizando bibliotecas oficiais. A equipe já possui experiência com o uso de APIs externas, o que reduz riscos de implementação e garante que os resultados possam ser integrados facilmente ao fluxo da aplicação.  

O prazo estimado para desenvolvimento é de dois meses e meio, dividido em {a inserir}, com entregas incrementais de funcionalidades. Esse modelo de desenvolvimento ágil permitirá validações constantes com o professor (usuário principal) e ajustes rápidos de funcionalidades conforme o feedback. O cronograma é considerado realista tendo em vista a expertise da equipe com React, Node.js e TypeScript, além da integração com APIs REST, e sua experiência prática em projetos web modernos.  

## Impacto da Solução

Espera-se que a nova plataforma de comunicação e distribuição de materiais didáticos traga uma série de benefícios para as aulas do Professor Maurício, impactando tanto dentro quanto fora das salas:  

- **Melhor gestão do conteúdo (materiais/informações):** a plataforma garantirá que o Professor Maurício tenha todo o conteúdo pertinente à matéria em um só domínio, permitindo um melhor gerenciamento.  
- **Fácil acesso por alunos:** a centralização dos conteúdos de aula em uma única plataforma fará com que os alunos não tenham de ficar procurando por ele em diversos meios.  
- **Inspiração nos trabalhos:** a exemplificação dos algoritmos ensinados, por meio de projetos dos próprios alunos, servirá de ensinamento e inspiração em seus projetos durante a matéria, promovendo maior originalidade.  
