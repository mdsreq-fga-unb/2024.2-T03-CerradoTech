## Lista de Requisitos Funcionais (RF)
Requisitos funcionais são especificações que descrevem o que o sistema deve fazer. Eles definem as funções, comportamentos e processos que o software precisa executar para atender às necessidades do usuário ou do negócio. 


| **ID**   | **Ação**               | **Resultado**                                   | **Objeto**                                  |
|----------|------------------------|-----------------------------------------------|-------------------------------------------|
| RF1      | Visualizar            | os limites e informações básicas               | das propriedades no mapa                      |
| RF2      | Editar                | os limites e salvar alterações confirmadas      | das propriedades no mapa                      |
| RF3      | Excluir               | os limites e concluir a exclusão               | das propriedades no mapa                      |
| RF4      | Inserir               | anotações vinculadas                           | das propriedades no mapa                      |
| RF5      | Monitorar             | índices de vegetação com dados de satélite     | do crescimento da vegetação                  |
| RF6      | Acompanhar            | densidade e altura exibidas                    | das plantas                                   |
| RF7      | Listar                | parcelas filtráveis e ordenáveis               | dos tipos de vegetação dentro de um polígono |
| RF8      | Visualizar            | detalhes e histórico editáveis                 | das parcelas específicas                      |
| RF9      | Monitorar             | alterações ambientais e registrar eventos      |das parcelas dos polígonos                    |
| RF10     | Receber               | notificações configuráveis                     | dos eventos críticos                          |
| RF11     | Gerar                 | relatórios detalhados                          | das propriedades, da vegetação e dos eventos         |
| RF12     | Cadastrar             | lembretes integrados                           | do monitoramento de períodos                 |



## Lista de Requisitos Não Funcionais (RNF)
Requisitos não funcionais, por outro lado, são características que descrevem como o sistema deve operar, em termos de desempenho, confiabilidade, segurança, usabilidade, entre outros. Eles não estão diretamente ligados a funcionalidades específicas, mas sim às qualidades do sistema.

| **Categoria URPS+**          | **ID**                               | **Descrição**                                                                                                                                           |
|------------------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Usabilidade**   | **RNF1**: Compatibilidade com Android | Garantir o uso em dispositivos Android, assegurando que o aplicativo funcione de forma eficaz em uma ampla gama de dispositivos Android, atendendo a diferentes públicos. |
| **Desempenho**  | **RNF2**: Funcionamento Offline      | Permitir a utilização do aplicativo mesmo sem conexão com a internet, com sincronização posterior. Essencial para a continuidade do trabalho em áreas sem cobertura de rede. |
| **Desempenho**  | **RNF3**: Desempenho                 | Oferecer uma experiência fluida e rápida, sem falhas ou lentidão, em dispositivos de diferentes capacidades.                                           |
| **Suportabilidade** | **RNF4**: Atualização de pacotes de dados e linguagens | Manter a plataforma atualizada com as melhores práticas e tecnologias, permitindo que ela evolua e acompanhe novas inovações no desenvolvimento de software. |
| **Confiabilidade** | **RNF5**: Segurança                  | O aplicativo deve garantir a proteção dos dados dos usuários, utilizando criptografia e autenticação segura, promovendo confiança no sistema.              |
| **Confiabilidade** | **RNF6**: Disponibilidade            | O aplicativo deve estar disponível para uso a maior parte do tempo, com mínima possibilidade de falhas ou interrupções, garantindo uma experiência contínua e confiável. |







## Funcionalidades de Manutenção e Melhoria (FM)
A funcionalidade de manutenção e melhoria refere-se às ações que realizaremos para garantir que o sistema atenda aos novos requisitos, considerando que o projeto RADIS Cerrado já está em operação. Essas funcionalidades visam ajustar, otimizar e expandir o sistema conforme as necessidades emergentes, assegurando sua continuidade e evolução.

| **ID** | **FUNCIONALIDADE**                                        | **OBJETIVO**                                                                                     | **DESCRIÇÃO**                                                                                                         |
|------------|------------------------------------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **FM1**    | Cadastro e Login de Usuário                                | Revisar e otimizar o processo de autenticação, incluindo possíveis ajustes em segurança e experiência do usuário. | Melhorar a eficácia e a experiência do usuário ao realizar o cadastro e login, garantindo segurança aprimorada e fluidez no processo de autenticação. |
| **FM2**    | Catálogo de Espécies                                       | Atualizar as informações das espécies e melhorar a funcionalidade de busca e categorização.         | Otimizar o catálogo, assegurando que as informações estejam atualizadas e que os usuários possam realizar buscas e filtrar as espécies de forma mais eficiente. |
| **FM3**    | Minha Conta                                               | Verificar e corrigir possíveis inconsistências no gerenciamento de informações pessoais do usuário. | Garantir que o sistema de gerenciamento de contas esteja funcionando corretamente, permitindo aos usuários editar e atualizar suas informações pessoais sem erros. |
| **FM4**    | Registro de Informações do Imóvel e Produção               | Garantir que os dados sejam armazenados corretamente e que as funcionalidades de edição e exclusão funcionem conforme o esperado. | Melhorar a confiabilidade do armazenamento de informações sobre o imóvel e a produção, permitindo que os usuários registrem, editem e excluam dados sem problemas. |
| **FM5**    | Identificação de Áreas de Desmate                          | Aperfeiçoar os algoritmos de detecção e corrigir possíveis erros na geração de alertas e relatórios. | Melhorar os algoritmos utilizados para detectar áreas de desmate, aprimorando a precisão das análises e corrigindo qualquer erro nos alertas e relatórios gerados. |



## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 16/12/2024   | 1.0        | Criação da página e organizações gerais      | Camila Careli                       | Todos os Membros            |
