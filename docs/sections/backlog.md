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
| **EP5 - Manutenção (FM'S)**     | **FM1** | Cadastro e Login de Usuário                       | Revisar e otimizar autenticação, ajustes em segurança e UX.                                                                                                    |
|                                 | **FM2** | Catálogo de Espécies                              | Atualizar info de espécies, melhorar busca e categorização.                                                                                                    |
|                                 | **FM3** | Minha Conta                                       | Corrigir inconsistências em gerenciamento de informações pessoais.                                                                                             |
|                                 | **FM4** | Registro de Informações do Imóvel e Produção      | Garantir armazenamento correto, edição e exclusão funcional.                                                                                                  |
|                                 | **FM5** | Identificação de Áreas de Desmate                 | Aperfeiçoar algoritmos de detecção, reduzir falsos positivos.                                                                                                 |

### Requisitos Não Funcionais

| **ID**  | **CATEGORIA**           | **DESCRIÇÃO**                                                                                                    | **CRITÉRIO**                                                                                                            |
|---------|-------------------------|------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| **RNF1** | Desempenho              | O aplicativo deve ser rápido e responsivo, com baixo consumo de recursos (memória e CPU), garantindo uma boa experiência do usuário mesmo com muitos dados ou operações simultâneas. | - Responder rapidamente a todas as ações do usuário. <br> - Navegação fluída, sem engasgos ou travamentos.                 |
| **RNF2** | Funcionalidade Offline  | O aplicativo deve funcionar sem necessidade de conexão com a internet para as funções essenciais, armazenando dados localmente e sincronizando automaticamente quando a conexão for restabelecida. | - Dados básicos offline. <br> - Sincronização ao retomar conexão.                                                      |
| **RNF3** | Segurança               | O aplicativo deve garantir a proteção dos dados dos usuários, utilizando criptografia, autenticação segura e outras práticas para prevenir acessos não autorizados, vazamento de informações ou falhas de segurança. | - Tempos de carregamento curtos. <br> - Boa performance em dispositivos modestos.                                        |
| **RNF4** | Manutenção              | O aplicativo deve ser fácil de manter e atualizar, com código bem estruturado e documentado, permitindo ajustes rápidos e a adição de novas funcionalidades sem grandes dificuldades. | - Atualizações periódicas de pacotes. <br> - Testes de regressão.                                                       |
| **RNF5** | Disponibilidade         | O aplicativo deve estar disponível para uso a maior parte do tempo, com mínima possibilidade de falhas ou interrupções, garantindo alta confiabilidade e tempo de atividade contínuo. | - Permanecer acessível e funcional durante o uso diário, com interrupções mínimas.                                       |
| **RNF6** | Compatibilidade com Android | O aplicativo deve ser compatível com as versões mais recentes do sistema operacional Android, bem como com versões anteriores, garantindo que funcione de maneira consistente em diferentes dispositivos Android, como smartphones e tablets. | - Rodar sem falhas no Android. <br> - Interface responsiva.                                                              |


## Priorização do Backlog Geral

**Valor (V)**: Representa a importância do requisito funcional para o usuário ou para o sistema. Pode ser classificado em **Alta (3)**, **Média (2)** ou **Baixa (1)**, indicando o impacto que a funcionalidade terá no projeto.  

**Complexidade (C)**: Indica o nível de dificuldade para desenvolver o requisito. Assim como o valor, é classificado em **Alta (3)**, **Média (2)** ou **Baixa (1)**, considerando fatores como tempo, esforço e recursos necessários para a implementação.  

**Dependências (D)**: Refere-se à existência de dependências entre o requisito e outras funcionalidades. Se o requisito depende de outra funcionalidade para ser implementado, ele recebe o valor **Sim (1)**. Caso contrário, o valor será **Não (0)**.  

**Cálculo do Índice de Prioridade (IP)**: Utiliza a fórmula **IP = (V + D) / C**, que combina o valor, as dependências e a complexidade do requisito. O objetivo é priorizar funcionalidades que têm maior impacto (V e D) e menor complexidade (C).  

**Índice de Prioridade (IP)**: Resultado numérico obtido a partir do cálculo **IP = (V + D) / C**, que serve para classificar a prioridade do requisito. Quanto maior o IP, maior a prioridade de desenvolvimento do requisito.  

**Prioridade**: Classificação final do requisito em relação à sua importância no backlog. Pode ser **Alta**, **Média** ou **Baixa**, baseada no valor calculado no IP. Geralmente, os requisitos com **IP ≥ 3** têm **Alta prioridade**, entre **2 e 3** possuem **Prioridade Média**, e os demais são considerados de **Baixa prioridade**.  


| **Requisito Funcional** | **Valor (V)** | **Complexidade (C)** | **Dependências (D)** | **Cálculo IP = (V+D)/C** | **IP**        | **Prioridade** |
|-------------------------|---------------|----------------------|----------------------|-------------------------|---------------|----------------|
| US1                     | Alta (3)      | Média (2)            | Sim (1)              | (3+1)/2 = 2.0           | 2             | Média          |
| US2                     | Alta (3)      | Alta (3)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Baixa          |
| US3                     | Alta (3)      | Baixa (1)            | Sim (1)              | (3+1)/1 = 4.0           | 4             | Alta           |
| US4                     | Média (2)     | Baixa (1)            | Sim (1)              | (2+1)/1 = 3.0           | 3             | Alta           |
| US5                     | Alta (3)      | Alta (3)             | Sim (1)              | (3+1)/3 = 1.33          | 1.333333      | Baixa          |
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

## Mínimo Produto Viável (MVP)


Mais detalhes dos requisitos funcionais podem ser vistos [aqui](backlog.md#requisitos-funcionais).

| **ÉPICOS**                     | **ID**  | **Critérios de Aceitação/Observações**                                                                                                                | **Prioridade** |
|---------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| **EP1 - Gestão de Propriedade** | **US1** | - O sistema deve exibir os limites das propriedades cadastradas no mapa de forma visível. <br> - Conseguir visualizar as informações básicas da propriedade (nome, área, etc.) ao clicar ou passar o cursor sobre o limite. | Média          |
|                                 | **US3** | - O usuário deve poder excluir o limite de uma propriedade após selecionar e confirmar a exclusão. <br> - O sistema deve exibir uma mensagem de confirmação antes de concluir a exclusão. | Alta           |
|                                 | **US4** | - O usuário deve poder adicionar anotações vinculadas a uma propriedade no mapa.                                                                                       | Alta           |
| **EP2 - Monitoramento Ambiental** | **US5** | - Integração com dados satélite. <br> - Exibição de índices de vegetação.                                                                                                               | Baixa          |
|                                 | **US6** | - O usuário deve conseguir visualizar a densidade das plantas. <br> - O usuário deve ser capaz de selecionar áreas específicas para visualizar os dados de densidade e altura das plantas. | Média          |
| **EP3 - Gestão de Parcelas**    | **US7** | - Listagem filtrável, ordenável. <br> - Informações resumidas por parcela.                                                                                                            | Alta           |
|                                 | **US8** | - Exibir detalhes, histórico, possibilidade de edição.                                                                                                                                | Média          |
| **EP4 - Gestão de Informações** | **US10** | - Notificações push/e-mail. <br> - Configuração de preferências.                                                                                                                      | Alta           |
|                                 | **US11** | - Seleção de parâmetros do relatório. <br> - Exportação em PDF.                                                                                                                      | Média          |
|                                 | **US12** | - Notificação push/e-mail. <br> - Calendário.                                                                                                                                         | Média          |
| **EP5 - Manutenção (FM'S)**     | **FM1** | Manutenção                                                                                                                                                                            | Média          |
|                                 | **FM3** | Manutenção                                                                                                                                                                            | Baixa          |
|                                 | **FM5** | Manutenção                                                                                                                                                                            | Alta           |



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