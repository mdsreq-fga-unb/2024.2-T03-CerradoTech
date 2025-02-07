## Sobre o Backlog do Produto

O backlog do produto é uma lista organizada por prioridade, contendo funcionalidades, requisitos, aprimoramentos, correções de erros e outras atividades que devem ser realizadas durante o processo de desenvolvimento do produto.

## Backlog Geral

### Requisitos Funcionais

| **ÉPICOS**                     | **ID**  | **REQUISITOS**                                     | **USER STORY**                                                                                              |
|---------------------------------|---------|---------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| **EP1 - Gestão de Propriedade** | **US1** | Visualizar Propriedades no Mapa                   | Como usuário, quero visualizar no mapa os limites das propriedades previamente cadastradas, para facilitar a identificação das áreas demarcadas e suas respectivas informações. |
|                                 | **US2** | Editar Limites de Propriedades no Mapa            | Como usuário, quero editar os limites das propriedades previamente cadastradas no mapa, para corrigir erros de marcação ou atualizar informações conforme mudanças nas áreas.         |
|                                 | **US3** | Excluir Limites de Propriedades no Mapa           | Como usuário, quero excluir os limites de propriedades cadastradas no mapa, para remover áreas que não são mais relevantes ou que foram cadastradas incorretamente.                   |
|                                 | **US4** | Inserir Anotações no Mapa                         | Como usuário, quero adicionar anotações ou descrições nas propriedades mapeadas, para registrar informações relevantes sobre a área, como o tipo de cultivo ou características do solo. |
| **EP2 - Monitoramento Ambiental** | **US5** | Monitorar Vegetação                               | Como usuário, quero analisar imagens de satélite para acompanhar o crescimento da vegetação.                                                                 |
|                                 | **US6** | Acompanhar Informações das Plantas                | Como usuário, quero visualizar densidade e altura das plantas para acompanhar a saúde da vegetação local.                                                   |
|                                 | **US9** | Monitorar Parcelas dos Polígonos                  | Como usuário ou sistema, quero detectar alterações ambientais (erosão, desmatamento) para monitorar o impacto ambiental.                                        |
| **EP3 - Gestão de Parcelas**    | **US7** | Listar de Parcelas                                | Como usuário, quero visualizar uma lista de parcelas para diferenciar vários tipos de vegetação dentro de um polígono (área em macro).                           |
|                                 | **US8** | Visualizar Detalhes de Parcelas                   | Como usuário, quero ver detalhes de uma parcela específica para monitorar áreas menores.                                                                     |
| **EP4 - Gestão de Informações** | **US10** | Receber Notificações                             | Como usuário, quero receber alertas sobre eventos críticos para agir rapidamente e mitigar danos.                                                            |
|                                 | **US11** | Gerar Relatórios                                  | Como usuário, quero gerar relatórios detalhados para análise e tomada de decisões.                                                                            |
|                                 | **US12** | Cadastrar Monitoramento                           | Como usuário, quero cadastrar um período de tempo para receber notificações lembrando de ir monitorar.                                                      |
| **EP5 - Manutenção (FM'S)**     | **FM1** | Cadastro de Usuário                       |  Como usuário, eu quero realizar o cadastro para poder acessar a plataforma e utilizar seus recursos.                                                                                                   |
|                                 | **FM2** | Login de Usuário                              | Como usuário, eu quero fazer login na plataforma para acessar minha conta e usar as funcionalidades disponíveis.                                                                                                    |
|                                 | **FM3** | Catálogo de Espécies                              | Como usuário, eu quero acessar um catálogo de espécies atualizado, com uma busca e categorização, para encontrar facilmente as informações necessárias.                                                                                                    |
|                                 | **FM4** | Minha Conta                                       |  Como usuário, eu quero gerenciar minhas informações pessoais de forma correta e consistente, para manter meus dados atualizados e precisos.                                                                                             |
|                                 | **FM5** | Registro de Informações do Imóvel e Produção      | Como usuário, eu quero registrar as informações do imóvel e da produção de forma eficiente, para manter os dados atualizados e bem organizados.                                                                                                  |
|                                 | **FM6** | Identificação de Áreas de Desmate                 |  Como usuário, eu quero poder identificar as áreas de desmate da minha propriedade, para garantir o acompanhamento e evolução da área.                                                                                                 |

### Requisitos Não Funcionais

| **ID**  | **CATEGORIA**           | **DESCRIÇÃO**                                                                                                    | **CRITÉRIO**                                                                                                            |
|---------|-------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **RNF1** | Desempenho              | O aplicativo deve ser rápido e responsivo, com baixo consumo de recursos (memória e CPU), garantindo uma boa experiência do usuário mesmo com muitos dados ou operações simultâneas. | - Responder rapidamente a todas as ações do usuário. <br> - Navegação fluída, sem engasgos ou travamentos.                 |
| **RNF2** | Funcionalidade Offline  | O aplicativo deve funcionar sem necessidade de conexão com a internet para as funções essenciais, armazenando dados localmente e sincronizando automaticamente quando a conexão for restabelecida. | - Dados básicos offline. <br> - Sincronização ao retomar conexão.                                                      |
| **RNF3** | Segurança               | O aplicativo deve garantir a proteção dos dados dos usuários, utilizando criptografia, autenticação segura e outras práticas para prevenir acessos não autorizados, vazamento de informações ou falhas de segurança. | - Tempos de carregamento curtos. <br> - Boa performance em dispositivos modestos.                                        |
| **RNF4** | Manutenção              | O aplicativo deve ser fácil de manter e atualizar, com código bem estruturado e documentado, permitindo ajustes rápidos e a adição de novas funcionalidades sem grandes dificuldades. | - Atualizações periódicas de pacotes. <br> - Testes de regressão.                                                       |
| **RNF5** | Disponibilidade         | O aplicativo deve estar disponível para uso a maior parte do tempo, com mínima possibilidade de falhas ou interrupções, garantindo alta confiabilidade e tempo de atividade contínuo. | - Permanecer acessível e funcional durante o uso diário, com interrupções mínimas.                                       |
| **RNF6** | Compatibilidade com Android | O aplicativo deve ser compatível com as versões mais recentes do sistema operacional Android, bem como com versões anteriores, garantindo que funcione de maneira consistente em diferentes dispositivos Android, como smartphones e tablets. | - Rodar sem falhas no Android. <br> - Interface responsiva.                                                              |


# Priorização do Backlog Geral

O backlog do **RADIS Cerrado** utiliza critérios de priorização para classificar as funcionalidades de acordo com sua relevância para o sistema, complexidade de desenvolvimento e dependências com outras funcionalidades. Essa priorização é fundamental para garantir que os esforços sejam concentrados nas funcionalidades de maior impacto e viabilidade.

---

## Critérios de Priorização

Os critérios de priorização são baseados em três dimensões principais: **Valor (V)**, **Complexidade (C)** e **Dependências (D)**. Cada uma delas é detalhada a seguir:

### **1. Valor (V)**

O **Valor** representa a importância de um requisito funcional para o sistema ou para o usuário final. Essa métrica é definida em conjunto com os stakeholders e leva em consideração o impacto que a funcionalidade terá no projeto, seja na experiência do usuário, na entrega de valor ou no atendimento a necessidades críticas.

- **Alta (3):** Funcionalidades essenciais que geram grande impacto no uso ou na operação do sistema.
- **Média (2):** Funcionalidades importantes, mas que podem ser entregues em fases posteriores sem grandes prejuízos.
- **Baixa (1):** Funcionalidades complementares ou de baixo impacto no curto prazo.

**Exemplo:** A funcionalidade de **Notificações Push** seria considerada de **Alta prioridade**, pois é essencial para alertar os usuários sobre eventos críticos.

---

### **2. Complexidade (C)**

A **Complexidade** refere-se ao esforço técnico e aos recursos necessários para implementar uma funcionalidade. Esse parâmetro é avaliado pela equipe de desenvolvimento, considerando o tempo estimado, a tecnologia envolvida e os desafios associados.

- **Alta (3):** Funcionalidades que exigem grande esforço técnico, tempo prolongado ou uso de tecnologias avançadas.
- **Média (2):** Funcionalidades com esforço moderado, mas que não apresentam obstáculos significativos.
- **Baixa (1):** Funcionalidades simples, rápidas de implementar e sem desafios técnicos complexos.

**Exemplo:** A funcionalidade de **Monitoramento por Imagens de Satélite** pode ser classificada como de **Alta complexidade** devido à integração com APIs externas e ao processamento de dados.

---

### **3. Dependências (D)**

As **Dependências** indicam se a funcionalidade depende de outra para ser implementada. Este critério é essencial para identificar sequências de desenvolvimento e evitar bloqueios.

- **Sim (1):** A funcionalidade está diretamente vinculada a outra e só pode ser implementada após a funcionalidade base ser concluída.
- **Não (0):** A funcionalidade é independente e pode ser desenvolvida isoladamente.

**Exemplo:** A funcionalidade de **Listagem de Parcelas** pode ser classificada como **Sim**, pois depende da funcionalidade de **Mapeamento de Propriedades** para exibir dados corretamente.

---

## **Cálculo do Índice de Prioridade (IP)**

A priorização dos requisitos utiliza o cálculo do **Índice de Prioridade (IP)** para determinar a ordem de desenvolvimento. A fórmula aplicada é:

IP = (V + D) / C

## **Prioridade**

A **Prioridade** é a classificação final do requisito em relação à sua importância no backlog. Ela é determinada com base no valor calculado do **Índice de Prioridade (IP)**, garantindo que os requisitos mais importantes sejam tratados primeiro. A priorização é dividida em três categorias:

- **Alta Prioridade:** Funcionalidades essenciais para o funcionamento do sistema ou com grande impacto na experiência do usuário. São aquelas classificadas com **IP ≥ 3** e devem ser desenvolvidas nas primeiras iterações ou como parte do MVP.

- **Média Prioridade:** Funcionalidades importantes, mas que não comprometem o uso do sistema se entregues em fases posteriores. Possuem **2 ≤ IP < 3** e complementam o desenvolvimento incremental.

- **Baixa Prioridade:** Funcionalidades complementares ou de menor impacto imediato, classificadas com **IP < 2**. São planejadas para iterações futuras, após a estabilização do sistema principal.

**Exemplo de Classificação:**

| **Requisito**           | **IP** | **Prioridade**         |
|--------------------------|--------|------------------------|
| Notificações Push        | 3.0    | Alta Prioridade        |
| Listagem de Parcelas     | 2.5    | Média Prioridade       |
| Monitoramento Vegetação  | 1.5    | Baixa Prioridade       |

Com essa categorização, o backlog é organizado de forma clara e objetiva, garantindo que as entregas priorizem as funcionalidades mais críticas para o sucesso do sistema.



| **Requisitos** | **Valor (V)** | **Complexidade (C)** | **Dependências (D)** | **Cálculo IP = (V+D)/C** | **IP**        | **Prioridade** |
|-------------------------|---------------|----------------------|----------------------|-------------------------|---------------|----------------|
| US1                     | Alta (3)      | Média (2)            | Sim (1)              | (3+1)/2 = 2.0           | 2             | Média          |
| US2                     | Alta (3)      | Alta (3)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Baixa          |
| US3                     | Alta (3)      | Baixa (1)            | Sim (1)              | (3+1)/1 = 4.0           | 4             | Alta           |
| US4                     | Média (2)     | Baixa (1)            | Sim (1)              | (2+1)/1 = 3.0           | 3             | Alta           |
| US5                     | Alta (3)      | Média (2)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Média          |
| US6                     | Média (2)     | Média (2)            | Sim (1)              | (2+1)/2 = 1.5           | 1.5           | Média          |
| US7                     | Média (2)     | Baixa (1)            | Sim (1)              | (2+1)/1 = 3.0           | 3             | Alta           |
| US8                     | Média (2)     | Média (2)            | Sim (1)              | (2+1)/2 = 1.5           | 1.5           | Média          |
| US9                     | Alta (3)      | Alta (3)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Baixa          |
| US10                    | Média (2)     | Baixa (1)            | Sim (1)              | (2+1)/1 = 3.0           | 3             | Alta           |
| US11                    | Média (2)     | Média (2)            | Sim (1)              | (2+1)/2 = 1.5           | 1.5           | Média          |
| US12                    | Alta (3)      | Média (2)            | Sim (1)              | (3+1)/2 = 2.0           | 2             | Média          |
| USNF1                   | Alta (3)      | Alta (3)             | Não (0)              | (3+0)/3 = 1.0           | 1             | Baixa          |
| USNF2                   | Alta (3)      | Alta (3)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Baixa          |
| USNF3                   | Média (2)     | Média (2)            | Não (0)              | (2+0)/2 = 1.0           | 1             | Baixa          |
| USNF4                   | Alta (3)      | Média (2)            | Não (0)              | (3+0)/2 = 1.5           | 1.5           | Média          |
| USNF5                   | Alta (3)     | Média (2)            | Não (0)              | (3+0)/2 = 1.5           | 1.5             | Média          |
| USNF6                   | Alta (3)      | Média (2)            | Não (0)              | (3+0)/2 = 1.5           | 1.5           | Média          |

## Mínimo Produto Viável (MVP)


Mais detalhes dos requisitos funcionais podem ser vistos [aqui](backlog.md#requisitos-funcionais).

| **ÉPICOS**                     | **ID**  | **Critérios de Aceitação/Observações**                                                                                                                | **Prioridade** |
|---------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| **EP1 - Gestão de Propriedade** | **US1** | - O sistema deve exibir os limites das propriedades cadastradas no mapa de forma visível. <br> - Conseguir visualizar as informações básicas da propriedade (nome, área, etc.) ao clicar ou passar o cursor sobre o limite. |Média          |
|                                 | **US3** | - O usuário deve poder excluir o limite de uma propriedade após selecionar e confirmar a exclusão. <br> - O sistema deve exibir uma mensagem de confirmação antes de concluir a exclusão. | Alta           |
|                                 | **US4** | - O usuário deve poder adicionar anotações vinculadas a uma propriedade no mapa.                                                                                       | Alta           |
| **EP2 - Monitoramento Ambiental** | **US5** | - Integração com dados satélite. <br> - Exibição de índices de vegetação.                                                                                                               | Média          |
|                                 | **US6** | - O usuário deve conseguir visualizar a densidade das plantas. <br> - O usuário deve ser capaz de selecionar áreas específicas para visualizar os dados de densidade e altura das plantas. | Média          |
| **EP3 - Gestão de Parcelas**    | **US7** | - Listagem filtrável, ordenável. <br> - Informações resumidas por parcela.                                                                                                            | Alta           |
|                                 | **US8** | - Exibir detalhes, histórico, possibilidade de edição.                                                                                                                                | Média          |
| **EP4 - Gestão de Informações** | **US10** | - Notificações push/e-mail. <br> - Configuração de preferências.                                                                                                                      | Alta           |
|                                 | **US11** | - Seleção de parâmetros do relatório. <br> - Exportação em PDF.                                                                                                                      | Média          |
|                                 | **US12** | - Notificação push/e-mail. <br> - Calendário.                                                                                                                                         | Média          |
| **EP5 - Manutenção (FM'S)**     | **FM1** | Realização da manutenção                                                                                                                                                                            | -          |
|                                 | **FM2** | Realização da manutenção                                                                                                                                                                            | -           |
|                                 | **FM3** | Realização da manutenção                                                                                                                                                                           | -           |
|                                 | **FM4** | Realização da manutenção                                                                                                                                                                            | -           |
|                                 | **FM5** | Realização da manutenção                                                                                                                                                                            | -           |
|                                 | **FM6** | Realização da manutenção                                                                                                                                                                            | -           |



Mais detalhes dos requisitos não funcionais podem ser vistos [aqui](backlog.md#requisitos-nao-funcionais).


| **ID**  | **CRITÉRIO**                                                                                                            | **PRIORIDADE** |
|---------|-------------------------------------------------------------------------------------------------------------------------|----------------|
| **RNF1** | - Responder rapidamente a todas as ações do usuário. <br> - Navegação fluída, sem engasgos ou travamentos.                 | Média          |
| **RNF2** | - Dados básicos offline. <br> - Sincronização ao retomar conexão.                                                      | Alta           |
| **RNF3** | - Tempos de carregamento curtos. <br> - Boa performance em dispositivos modestos.                                        | Média          |
| **RNF4** | - Atualizações periódicas de pacotes. <br> - Testes de regressão.                                                       | Média          |
| **RNF5** | - Permanecer acessível e funcional durante o uso diário, com interrupções mínimas.                                       | Média          |
| **RNF6** | - Rodar sem falhas no Android. <br> - Interface responsiva.                                                              | Alta           |



## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 16/12/2024   | 1.0        | Criação da página e organizações gerais      | Camila Careli                       | Todos os Membros            |
| 20/12/2024   | 2.0        | Corrigindo declaração dos FMs dentro do Backlog      | Brenno da Silva             | Todos os Membros            |
| 07/01/2025   | 2.1        | Corrigindo declaração de prioridade, e suas caracteristicas      | Patrick Anderson| Todos os Membros            |
| 07/02/2025   | 2.2        | Alguns ajustes e atualizações     | Brenno da Silva             | Todos os Membros            |