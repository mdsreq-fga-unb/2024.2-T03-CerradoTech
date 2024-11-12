# Visão do Produto e Projeto
***
## 1. Cenário Atual do Cliente e do Negócio

### Introdução ao Negócio e Contexto

O Centro de Gestão e Inovação da Agricultura Familiar (Cegafi), vinculado à Universidade de Brasília (UnB), é uma entidade de pesquisa dedicada ao desenvolvimento de soluções inovadoras para o setor agrícola familiar. Com um foco particular nas áreas de sustentabilidade e inclusão social, o Cegafi busca melhorar as condições de vida das populações rurais vulneráveis por meio de projetos que incentivam a preservação ambiental e promovem a segurança jurídica das propriedades. A instituição trabalha diretamente com pequenos proprietários e assentamentos, promovendo a recuperação de áreas que sofreram desmatamento para atividades agrícolas e assegurando que essas ações estejam em conformidade com a legislação ambiental brasileira.

Como parte desse compromisso, o aplicativo RADIS Cerrado foi desenvolvido para monitorar áreas degradadas do Cerrado, um dos biomas mais biodiversos e ameaçados do Brasil. Essa ferramenta oferece suporte técnico e científico, promovendo práticas de uso sustentável da terra que contribuem para a conservação do bioma e para a segurança alimentar das comunidades locais.

### Identificação da Oportunidade ou Problema

O RADIS Cerrado está atualmente fora do ar devido a uma série de problemas técnicos e operacionais que comprometem sua funcionalidade e expansão. As principais causas identificadas incluem:

- *Necessidade de Arquitetura Modular*: A falta de modularidade limita a escalabilidade e a adaptação do aplicativo a novas funcionalidades. Uma arquitetura modular é essencial para facilitar futuras integrações e a expansão do sistema, atendendo às demandas de parceiros e evoluções no monitoramento ambiental.
- *Necessidade de Modernização do Front-end*: O front-end utiliza pacotes desatualizados, comprometendo a usabilidade, segurança e compatibilidade com dispositivos modernos. A atualização para versões mais recentes do framework é crucial para proporcionar uma experiência de usuário aprimorada e garantir a manutenção de longo prazo.
- *Ausência de Testes de Compatibilidade Offline*: A operação offline é um requisito crítico para o uso do RADIS em áreas remotas, mas ainda não foi devidamente testada. A implementação e validação desse recurso são essenciais para permitir que dados sejam armazenados localmente e sincronizados posteriormente.
- *Falta de Documentação Consistente*: A ausência de uma documentação técnica clara dificulta a manutenção e a adaptação do sistema por novos desenvolvedores.
- *Pacotes Desatualizados e Tecnologias Antigas*: A utilização de tecnologias ultrapassadas limita a performance e a segurança do aplicativo, aumentando a complexidade de manutenção e atualização.

Esses desafios resultaram na indisponibilidade do aplicativo, impactando diretamente a capacidade do RADIS Cerrado de cumprir sua função de monitoramento ambiental. Contudo, a resolução desses problemas representa uma oportunidade para tornar o aplicativo uma ferramenta robusta e escalável, alinhada às necessidades dos stakeholders e ao objetivo de preservação ambiental do bioma Cerrado.

### Desafios do Projeto

- *Atualização da tecnologia do front-end*: O aplicativo foi desenvolvido em Ionic 5, uma versão desatualizada que dificulta a implementação de padrões modernos de usabilidade. A atualização dos pacotes e da estrutura do front-end é necessária para proporcionar uma experiência de usuário otimizada e manter o aplicativo alinhado com as melhores práticas atuais.
- *Garantia de funcionamento offline*: Para os usuários em áreas rurais e remotas do Cerrado, onde o acesso à internet é limitado ou inexistente, o suporte offline é essencial. Implementar essa funcionalidade é um desafio crítico para garantir que o aplicativo cumpra seu objetivo de monitoramento ambiental, independentemente das condições de conectividade.
- *Implementação de uma arquitetura modular*: A criação de uma arquitetura modular permitirá que o aplicativo seja facilmente expandido para atender a demandas futuras da ONG parceira e dos técnicos de campo. Essa abordagem trará maior flexibilidade ao projeto, tornando possível a adição de novos módulos sem a necessidade de uma reformulação completa.
- *Documentação abrangente do projeto*: A ausência de documentação técnica adequada tem sido uma barreira significativa para a manutenção e evolução do aplicativo. Desenvolver uma documentação clara e acessível é fundamental para facilitar futuras atualizações e corrigir problemas, especialmente considerando o histórico de insatisfação com o suporte e desenvolvimento anteriores.

### Segmentação de Clientes

- *Pequenos Agricultores*: Usam o aplicativo para monitorar a vegetação local e registrar dados de restauração de áreas degradadas, frequentemente em regiões com conectividade limitada.
- *Comunidades Rurais*: Similar aos pequenos agricultores, essas comunidades dependem do uso offline para coletar dados e garantir práticas sustentáveis.
- *ONGs*: Utilizam o aplicativo para acompanhar projetos de recuperação ambiental e prestar assistência técnica nas áreas rurais.
- *Técnicos Ambientais*: Coletam e processam dados de campo, colaborando com as ONGs e outros parceiros para acompanhar projetos ambientais.
- *Órgãos Reguladores*: O aplicativo fornece uma fonte confiável de dados que permite monitorar e avaliar o cumprimento de exigências ambientais, facilitando o trabalho de fiscalização e promovendo a preservação do Cerrado.
*
## 2. Solução Proposta

### Objetivos do Produto

Reativar o aplicativo RADIS Cerrado de forma robusta, confiável e escalável, solucionando os problemas técnicos e de usabilidade que o deixaram fora do ar, para atender à necessidade crítica de monitoramento ambiental e regularização de propriedades rurais no Cerrado.

Para alcançar esse objetivo principal, espera-se que o RADIS Cerrado:

- *Melhore a experiência do usuário e a segurança do sistema*: Com uma interface modernizada e funcionalidades atualizadas.
- *Ofereça operação offline*: Permitindo a coleta e o armazenamento de dados em áreas remotas sem conexão com a internet.
- *Seja modular e expansível*: Estruturado de forma que novos módulos e funcionalidades possam ser facilmente integrados.

### Características da Solução

- *Operação Offline*: Coleta de dados de GPS, fotos e vídeos para posterior sincronização com a nuvem.
- *Módulos Expansíveis*: Estrutura modular para facilitar a adição de novas funcionalidades.
- *Compatibilidade com Android*: Garantindo custo de desenvolvimento menor e maior acessibilidade aos usuários rurais.
- *Interface Simples*: Melhorada para maior usabilidade, especialmente em ambientes rurais.

### Tecnologias a Serem Utilizadas

- *Back-end*: Node.js, com banco de dados não-relacional MongoDB.
- *Front-end*: Ionic 5, que será atualizado para as versões mais recentes.
- *Armazenamento de Dados*: Integração com serviços de nuvem.
- *Frameworks de Gestão*: Scrum.

### Pesquisa de Mercado e Análise Competitiva

O RADIS Cerrado se diferencia por sua capacidade de operação offline, um recurso fundamental para os usuários em regiões remotas. O aplicativo é projetado especificamente para a preservação do bioma do Cerrado, oferecendo funcionalidades de monitoramento ambiental, restauração e conformidade legal.

### Análise de Viabilidade

- *Técnica*: A atualização do front-end e a adaptação para funcionamento offline são viáveis.
- *Prazo*: Expectativa de conclusão em cerca de 4 meses.
- *Financeira*: Projeto de baixo custo, focado em manutenção e atualizações específicas.
- *Mercado*: Recuperação ambiental e conformidade com normas ambientais são atrativos para ONGs e instituições ambientais.

### Impacto da Solução

A implementação do RADIS Cerrado promoverá a restauração de áreas degradadas, garantindo monitoramento contínuo e eficiente mesmo em áreas remotas. A solução fortalece a conformidade com a legislação ambiental, auxiliando produtores rurais a promover práticas sustentáveis e contribuindo para uma política de proteção ambiental mais eficaz no Cerrado.
*
## 3. Estratégias de Engenharia de Software
### Estratégia Priorizada

| *ABORDAGEM*                      | *CICLO DE VIDA* | *PROCESSO* |
|-------------------------------------|-------------------|---------------------------------------|
| Dirigida a Plano                   | Iterativo         | Espiral                               |
| A escolha por uma abordagem Dirigida a Plano permite um planejamento inicial mais detalhado e estruturado, o que é essencial neste contexto, pois o projeto envolve a reativação de um sistema com problemas complexos e demandas específicas. Com uma abordagem mais controlada, podemos definir marcos e metas claras que ajudam a monitorar o progresso e garantir que os requisitos principais sejam atendidos antes de avançar para as próximas fases.                        | O ciclo de vida Iterativo foi selecionado para permitir a implementação de funcionalidades em incrementos. Esse modelo é ideal para o RADIS Cerrado, pois possibilita validar as correções e novas funcionalidades em pequenas fases de desenvolvimento, permitindo o ajuste contínuo conforme feedbacks dos stakeholders e testes. Isso é particularmente importante no desenvolvimento de funcionalidades críticas como o modo offline e a modularidade.      | O Modelo Espiral combina elementos de desenvolvimento iterativo e incremental com um foco significativo em avaliação de riscos, o que é extremamente valioso para um projeto como o RADIS Cerrado. Cada ciclo da espiral inclui as fases de planejamento, análise de risco, desenvolvimento e avaliação, permitindo um controle mais refinado sobre a qualidade e a adaptabilidade do software.                          |

### Quadro Comparativo
Abaixo, uma comparação entre o Modelo Espiral e o Rational Unified Process (RUP), ambos modelos iterativos, para avaliar qual seria o mais adequado para o projeto RADIS Cerrado. 

| Critério                            | Modelo Espiral                                                                                          | Rational Unified Process (RUP)                                                                                   |
|-------------------------------------|--------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| *Foco na Gestão de Riscos*        | Foco forte na análise e mitigação de riscos a cada iteração, ideal para situações com incertezas técnicas, como a atualização do RADIS Cerrado. | RUP aborda riscos de forma limitada, com menos ênfase contínua em análise de riscos.                              |
| *Adaptabilidade*                  | Altamente adaptável, pois cada ciclo permite revisões e ajustes com base em feedbacks e riscos identificados. | Adaptável, mas segue fases pré-definidas (Iniciação, Elaboração, Construção, Transição) com menos flexibilidade para mudanças em fases avançadas. |
| *Complexidade de Implementação*  | Comparativamente mais simples de implementar para projetos menores e médios, pois permite controle sobre cada iteração. | RUP pode se tornar complexo, pois envolve várias disciplinas e papéis específicos, sendo mais adequado para projetos maiores e de longo prazo. |
| *Custo e Tempo*                   | Mais eficiente para controle de custos e tempo, pois permite avaliação contínua a cada iteração e ajustes rápidos. | RUP pode exigir mais recursos para gerenciar o processo, o que aumenta o custo e a carga administrativa.          |
| *Feedback Contínuo*               | Permite a incorporação de feedback contínuo a cada ciclo, essencial para corrigir rapidamente falhas e melhorar o produto. | Feedback é mais focado nas revisões de cada fase, limitando a capacidade de ajustar com agilidade entre fases.    |
| *Aplicação para Projetos de Restauração* | Ideal para projetos com problemas complexos e necessidade de restauração e modernização, como o RADIS Cerrado. | RUP é mais estruturado e menos voltado para ajustes frequentes, dificultando sua aplicação em projetos que exigem restaurações urgentes. |

### Justificativa
A escolha do *Modelo Espiral* sobre o *RUP* é fundamentada nas necessidades específicas do projeto *RADIS Cerrado*, que envolve:

*Problemas de Manutenção e Modularidade:*
A espiral permite um foco contínuo na análise de riscos e na flexibilidade para modificar o sistema, o que é essencial para resolver problemas de modularidade e manter o aplicativo em conformidade com novas exigências técnicas e de usabilidade.

- *Feedback e Adaptação Constante:*
O RADIS Cerrado requer ajustes contínuos e validações frequentes, principalmente para o suporte offline e o uso modular. A espiral permite revisar e ajustar o sistema a cada iteração, enquanto o RUP segue um ciclo mais rígido de fases, o que pode atrasar a implementação de melhorias urgentes.

- *Gestão de Riscos:*
O modelo espiral proporciona uma abordagem integrada para identificar e mitigar riscos técnicos em cada iteração, algo fundamental em um projeto de reativação como o RADIS, onde imprevistos podem surgir com frequência. O RUP, por outro lado, possui uma abordagem menos intensiva de análise de riscos, tornando-o menos eficaz nesse contexto.

Portanto, o *Modelo Espiral* se alinha melhor com os objetivos de modularidade, segurança e confiabilidade do *RADIS Cerrado*, fornecendo uma estrutura de desenvolvimento que se adapta bem ao processo de restauração e modernização.
*
## 4. Cronograma e Entregas
O planejamento temporal do projeto deve ser estruturado em ciclos iterativos, garantindo que cada fase do desenvolvimento seja validada antes de avançar. Como referência inicial, o cronograma pode ser assim estabelecido:

**Observação:* Esse cronograma inicial pode ser ajustado a cada ciclo de feedback, garantindo que o desenvolvimento permaneça alinhado com os objetivos de modularidade, funcionalidade offline e modernização do aplicativo.*

| *FASE*                       | *INÍCIO*  | *FIM*    | *ENTREGA*                                         |
|---------------------------------|-------------|------------|-----------------------------------------------------|
| *Planejamento*                | Semana 1    | Semana 2   | Plano de Desenvolvimento e Elicitação de Requisitos |
| *Fase de Risco Inicial*       | Semana 3    | Semana 4   | Avaliação de Riscos e Estrutura Modular             |
| *Desenvolvimento Iteração 1*  | Semana 5    | Semana 8   | Prototipação do Front-end Atualizado e Funcionalidade Offline Básica |
| *Testes e Validação 1*        | Semana 9    | Semana 10  | Feedback da Primeira Iteração e Ajustes            |
| *Desenvolvimento Iteração 2*  | Semana 11   | Semana 14  | Implementação Completa de Modularidade e Funcionalidade Offline Avançada |
| *Testes e Validação 2*        | Semana 15   | Semana 16  | Avaliação e Ajustes Baseados no Feedback            |
| *Entrega Final*               | Semana 17   | Semana 18  | Versão Final do RADIS Cerrado Atualizada e Funcional |

*
## 5. Equipe

### Comunicação
Para garantir a efetividade do projeto RADIS Cerrado e manter todos os stakeholders alinhados, a comunicação entre a equipe e o cliente será estruturada de acordo com as práticas do Scrum, com uma combinação de reuniões recorrentes, ferramentas de comunicação ágil e documentações compartilhadas.

### Ferramentas de Comunicação

- *Microsoft Teams*: Será utilizado para reuniões semanais de Sprint Planning e Sprint Review, além de chamadas rápidas quando necessário. O Teams também será usado para atualizações pontuais e discussões mais detalhadas, que exijam compartilhamento de tela ou colaboração em tempo real.

- *GitHub*: Repositório central para armazenar o código e documentações do projeto, com integração para gerenciar issues, relatórios de progresso e discussões técnicas. O GitHub servirá como principal referência de status do projeto, permitindo ao cliente acompanhar as entregas.

- *Trello*: Utilizado para gerenciar as tarefas do Sprint Backlog e visualizar o progresso das atividades em um quadro Kanban. Cada tarefa estará ligada aos requisitos e funcionalidades priorizadas, permitindo que o cliente e os membros da equipe acompanhem o status de cada item de forma visual e organizada.

- *Moodle/Google Drive*: Plataforma para centralizar documentos, relatórios e outros materiais relevantes. Essa será a referência para o cliente acessar documentos de projeto e relatórios de reuniões.

### Frequência das Reuniões e Interações

- *Daily Scrum (Diário)*: Reuniões diárias de 15 minutos para alinhamento da equipe sobre o progresso das tarefas, obstáculos enfrentados e próximos passos.

- *Sprint Planning (Início de cada Sprint)*: Reunião para definir o backlog do Sprint, identificar tarefas prioritárias e alinhar com o cliente os objetivos para o próximo ciclo.

- *Sprint Review (Fim de cada Sprint)*: Apresentação dos resultados do Sprint para o cliente, com demonstração das funcionalidades entregues e coleta de feedbacks para ajuste de prioridades futuras.

- *Sprint Retrospectiva (Fim de cada Sprint)*: Reunião interna para a equipe revisar o que funcionou bem e o que precisa ser aprimorado, buscando melhorar continuamente o processo de trabalho.

- *Feedbacks Informais*: A equipe está aberta a feedbacks contínuos do cliente por meio do Teams ou GitHub, permitindo ajustes rápidos e melhor adaptação às necessidades do cliente.

### Processo de Validação
*1. Validação Incremental por Sprint:* Cada Sprint culminará em uma *Sprint Review*, onde o cliente terá a oportunidade de revisar e testar as funcionalidades entregues durante o ciclo. O feedback do cliente será coletado e documentado para ajustes e melhorias nas próximas iterações, garantindo que o desenvolvimento esteja sempre alinhado com as expectativas.

- *Testes de Aceitação*: Cada funcionalidade será acompanhada de critérios de aceitação definidos no início do Sprint. O cliente poderá validar esses critérios durante a revisão, confirmando que a entrega atende aos requisitos estabelecidos.

- *Testes de Compatibilidade*: Para garantir o funcionamento offline e a adequação às condições de uso em áreas remotas, serão realizados testes de compatibilidade com diferentes dispositivos Android e em cenários sem conexão, validando o armazenamento temporário de dados.

*2. Validação Final:* Ao final do projeto, será realizada uma *Validação Final*, onde todas as funcionalidades do RADIS Cerrado serão apresentadas ao cliente em sua totalidade. Esta fase incluirá:

- *Testes de Integração*: Verificação de que todos os módulos e funcionalidades do sistema estão integrados corretamente e funcionam como um sistema completo.

- *Testes de Usabilidade*: Será realizada uma revisão da experiência do usuário, considerando o público-alvo (pequenos agricultores e técnicos) para garantir que a interface seja intuitiva e prática.

- *Feedback Conclusivo*: O cliente poderá testar a versão final e fornecer feedback sobre o desempenho, completude e conformidade com os requisitos iniciais. Ajustes finais poderão ser realizados para garantir que o produto esteja pronto para o uso prático no campo.

Esse processo de validação contínua e final visa garantir que o RADIS Cerrado atenda às expectativas do cliente e cumpra plenamente seus objetivos de monitoramento ambiental e suporte ao usuário, promovendo uma entrega de alta qualidade e alinhada com as necessidades reais.
*
## 7. Referências Bibliográficas

### Engenharia de Software e Engenharia de Requisitos

*Wiegers, K. E., & Beatty, J (2013). Software Requirements (3rd ed.). Microsoft Press:* Este livro é uma referência essencial na área de engenharia de requisitos, cobrindo práticas para a elicitação, análise e documentação de requisitos de software. Ele pode ajudar a fundamentar o processo de levantamento e documentação dos requisitos para o RADIS Cerrado.

*Sommerville, I. (2018). Software Engineering (10th ed.). Pearson:* Este livro aborda os fundamentos da engenharia de software, incluindo diferentes abordagens e ciclos de vida de desenvolvimento, como o modelo espiral e o RUP. A leitura pode auxiliar na escolha e justificativa das estratégias de desenvolvimento para o projeto RADIS.

*Pressman, R. S., & Maxim, B. R (2014). Engenharia de Software: Uma Abordagem Profissional (8ª ed.). McGraw-Hill:* Oferece uma visão abrangente sobre os principais processos de desenvolvimento de software, métodos de gestão de projetos e práticas ágeis. Também aborda a análise de riscos, um elemento crítico no modelo espiral utilizado no RADIS Cerrado.

*Crawford, M. M., & Walker, R. (2019). Using Agile Methods in Environmentally Sustainable Software Development. IEEE Software, 36(4), 82-89:**  Este artigo aborda a aplicação de métodos ágeis em projetos de software sustentáveis, o que pode auxiliar na fundamentação da abordagem ágil e iterativa proposta para o RADIS Cerrado.

*Brito, M. T., & Medeiros, J. P. (2020). Engenharia de Requisitos e Sustentabilidade: Princípios e Práticas. Journal of Software Engineering Research and Development, 8 (2), 54-68:* Este artigo explora como a engenharia de requisitos pode contribuir para a sustentabilidade, oferecendo diretrizes para incorporar práticas sustentáveis no levantamento e análise de requisitos de projetos voltados para o meio ambiente.

### Monitoramento Ambiental e Recuperação de Áreas Degradadas

*Malczewski, J. (1999). *GIS and Multicriteria Decision Analysis. John Wiley & Sons:** Este livro é uma excelente referência para métodos de análise de dados geoespaciais, que podem ser relevantes para o mapeamento e monitoramento ambiental abordado pelo RADIS Cerrado, especialmente na coleta e análise de dados de restauração.

*Martins, S. V (2001). Recuperação de Matas Ciliares: A Experiência de Minas Gerais. Universidade Federal de Viçosa1:* Embora o foco seja na recuperação de matas ciliares, este livro fornece uma base sólida para práticas de recuperação ambiental, alinhadas com os objetivos do RADIS Cerrado de apoiar a restauração de áreas degradadas no bioma.

*Pivello, V. R. (2011). The Use of Fire in the Cerrado and Amazonian Rainforests of Brazil: Past and Present. *Fire Ecology, 7 (1), 24-39:* Artigo relevante sobre o uso do fogo no Cerrado e seu impacto nos ecossistemas. Pode ser útil para contextualizar os desafios da preservação e recuperação no bioma Cerrado.

*Filgueiras, R., & Oliveira, P. S. (2006). Técnicas de recuperação de áreas degradadas no Cerrado. Embrapa Cerrados:* Um estudo técnico da Embrapa sobre métodos de recuperação de áreas degradadas especificamente no Cerrado, o que pode enriquecer a justificativa para as funcionalidades de monitoramento e recuperação no RADIS Cerrado.

*Costa, L. P., Leite, Y. L. R., Fonseca, G. A. B., & Fonseca, M. T. (2000). Biogeography of South American forest mammals: Endemism and diversity in the Atlantic Forest. *Biotropica, 32(4), 872-881:*  Embora focado na Mata Atlântica, este artigo discute conceitos biogeográficos e de biodiversidade aplicáveis ao Cerrado, especialmente no contexto de recuperação de áreas degradadas.

### Links Visitados

- Museu do Cerrado - RADIS Cerrado
- UnB Notícias - Aplicativo auxilia agricultores na restauração do Cerrado
- CEGAFI UnB - RADIS Cerrado
- Fundovale - RADIS Cerrado e a restauração do bioma
- Mata Nativa - RADIS Cerrado
- Finatec - Desenvolvido por pesquisadores da UnB, app ajuda no rastreio e restauração do Cerrado