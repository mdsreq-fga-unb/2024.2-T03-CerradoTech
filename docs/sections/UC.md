Casos de Uso são uma técnica da na engenharia de requisitos na qual descrevem as interações entre os atores e o software que será construído, com o objetivo de alcançar metas específicas. 

## Estudo de Caso
A HopeBridge é um sistema que conecta os refugiados palestinos a serviços essenciais, oportunidades de  trabalho e redes de apoio, promovendo a reconstrução de vidas e comunidades de forma  integrada e sustentável. 

## Diagrama

![Diagrama](../assets/Diagrama%20HopeBridge.svg)


**Ator: REFUGIADO**

| Requisitos                        | Casos de Uso                        | Resultado Observável                                                  |
|------------------------------------|-------------------------------------|----------------------------------------------------------------------|
| Criar perfil                      | Criar perfil                        | Perfil criado com sucesso                                             |
| Buscar Serviços Básicos           | Buscar Serviços Básicos             | Lista de serviços disponíveis exibida                                |
| Solicitar Serviços de Ajuda       | Solicitar Serviços de Ajuda         | Solicitação confirmada e registrada no sistema                       |
| Solicitar vagas em abrigos        | Solicitar vagas em abrigos          | Vaga solicitada com sucesso e aguardando confirmação                 |
| Agendar consultas médicas         | Agendar consultas médicas           | Consulta agendada e confirmada no sistema                             |
| Solicitar vouchers                | Solicitar vouchers                  | Voucher solicitado e disponível para uso                             |
| Acessar Oportunidades de Trabalho | Acessar Oportunidades de Trabalho   | Lista de oportunidades de trabalho sugeridas exibidas com sucesso    |
| Candidatar ao trabalho            | Candidatar ao trabalho              | Candidatura registrada e enviada para análise                        |
| Acessar as capacitações disponíveis| Acessar as capacitações disponíveis | Lista de capacitações oferecidas exibida com sucesso                 |
| Realizar capacitação              | Realizar capacitação                | Capacitação concluída e certificação disponível                      |
| Participar de Projetos Comunitários| Participar de Projetos Comunitários | Confirmação de participação no projeto                               |
| Acessar trajetos                  | Acessar trajetos                    | Mapas dos trajetos disponíveis                                       |
| Acessar opções de transporte      | Acessar opções de transporte        | Meios de transporte disponíveis e seus horários                      |



**Ator: AGÊNCIA HUMANITÁRIA**

| Requisitos                        | Casos de Uso                        | Resultado Observável                                                  |
|------------------------------------|-------------------------------------|----------------------------------------------------------------------|
| Criar perfil                      | Criar perfil                        | Perfil criado com sucesso                                             |
| Monitorar Demandas de Recursos    | Monitorar Demandas de Recursos      | Visualização das demandas dos serviços solicitados                   |
| Distribuir Recursos               | Distribuir Recursos                 | Alocação e distribuição de recursos                                   |
| Organizar eventos                 | Organizar eventos                   | Eventos como campanhas de saúde, educação e outros serviços essenciais criados com sucesso |
| Planejar intervenções             | Planejar intervenções               | Intervenção definida com sucesso                                      |


**Ator: EMPREGADOR PARCEIRO**

| Requisitos            | Casos de Uso            | Resultado Observável                                                      |
|---------------------------|---------------------------|------------------------------------------------------------------------|
| Criar perfil              | Criar perfil              | Perfil criado com sucesso                       |
| Anunciar vagas            | Anunciar vagas            | Vagas anunciadas com sucesso                                          |
| Gerenciar candidaturas    | Gerenciar candidaturas    | Candidaturas recebidas e organizadas no sistema com feedback dos entrevistados |


**Ator: ADMINISTRADOR DO SISTEMA**

| Requisitos            | Casos de Uso            | Resultado Observável                                                      |
|-----------------------------------------|-----------------------------------------|----------------------------------------------------------------|
| Criar perfil                            | Criar perfil                            | Perfil criado com sucesso                                     |
| Monitorar indicadores de desempenho da plataforma | Monitorar indicadores de desempenho da plataforma | Plataforma sempre disponível e com bom desempenho             |
| Ajustar Funcionalidades                 | Ajustar Funcionalidades                 | Plataforma atualizada e otimizada                             |
| Gerenciar permissões de usuários        | Gerenciar permissões de usuários        | Controle de acesso e verificação da integridade de perfis    |

## Especificações

### Especificação 1: Organizar Eventos

| **Campo**               | **Descrição**                                                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Breve Descrição**     | Permite que agências humanitárias organizem eventos comunitários e culturais, palestras ou atividades de reconstrução de infraestrutura, para promover a integração social e econômica e o engajamento aos refugiados. |
| **Atores**              | Agências Humanitárias.                                                                                                                                                                                      |
| **Condições Prévias**   | O ator deve estar logado na plataforma.                                                                                                                                                                     |
| **Fluxo Básico (FB)**   |                                                                                                                                                                                                             |
| FB1                     | O ator acessa a seção de "Organizar Eventos" na plataforma.                                                                                                                                                 |
| FB2                     | O sistema exibe um formulário para inserir as informações do evento, incluindo: Nome do evento, Data e horário (RN01), Local, Tipo do evento, Descrição e objetivos do evento.                                |
| FB3                     | O ator preenche os detalhes do evento.                                                                                                                                                                      |
| FB4                     | O sistema exibe uma lista de parceiros disponíveis (ONGs, voluntários, empresas) para o tipo de evento (FE2).                                                                                              |
| FB5                     | O organizador seleciona os parceiros que irão apoiar o evento (FE2).                                                                                                                                       |
| FB6                     | O sistema valida os dados (FE1) (FE3).                                                                                                                                                                    |
| FB7                     | O evento é salvo e registrado no calendário da plataforma.                                                                                                                                                  |
| FB8                     | O sistema notifica os refugiados e parceiros sobre o novo evento.                                                                                                                                           |
| FB9                     | O caso de uso é encerrado.                                                                                                                                                                                  |
| **Fluxo Alternativo (FA)** |                                                                                                                                                                                                             |
| FA1 - Cancelar Evento  |                                                                                                                                                                                                             |
| FA1.1                  | O ator acessa a seção "Organizar Eventos" e seleciona um evento já criado.                                                                                                                                  |
| FA1.2                  | O ator seleciona a opção "Cancelar Evento".                                                                                                                                                                 |
| FA1.3                  | O sistema solicita confirmação do cancelamento.                                                                                                                                                             |
| FA1.4                  | O ator confirma o cancelamento.                                                                                                                                                                             |
| FA1.5                  | O sistema remove o evento do calendário.                                                                                                                                                                    |
| FA1.6                  | O sistema notifica os refugiados e parceiros sobre o cancelamento.                                                                                                                                          |
| FA1.7                  | O fluxo é encerrado.                                                                                                                                                                                        |
| FA2 - Editar Evento    |                                                                                                                                                                                                             |
| FA2.1                  | O ator acessa a seção "Organizar Eventos" e seleciona um evento já criado.                                                                                                                                  |
| FA2.2                  | O ator edita as informações do evento.                                                                                                                                                                      |
| FA2.3                  | O sistema valida as alterações (FE1).                                                                                                                                                                      |
| FA2.4                  | O sistema salva as alterações e notifica os refugiados e parceiros sobre as atualizações.                                                                                                                   |
| FA2.5                  | O fluxo é encerrado.                                                                                                                                                                                        |
| **Fluxo de Exceção (FE)** |                                                                                                                                                                                                             |
| FE1 - Dados inválidos  | No passo FB6 do fluxo básico ou FA2.3 do fluxo alternativo, caso os dados do evento estejam incompletos ou incorretos (ex.: data no passado, campos obrigatórios não preenchidos), o sistema exibe a mensagem: "Dados inválidos. Verifique as informações e tente novamente." O caso de uso retorna ao passo FB2 do fluxo básico. |
| FE2 - Parceiros indisponíveis | No passo FB4 e FB5 do fluxo básico, caso não haja parceiros disponíveis para o tipo de evento selecionado, o sistema exibe a mensagem: "Nenhum parceiro disponível para este tipo de evento." O ator pode prosseguir sem selecionar parceiros ou cancelar a criação do evento. |
| FE3 - Conflito de Data/Horário | No passo FB6 do fluxo básico, caso a data e horário do evento conflitem com outro evento já registrado, o sistema exibe a mensagem: "Conflito de agenda. Escolha outra data ou horário." O caso de uso retorna ao passo FB2 do fluxo básico. |
| **Regra de Negócio (RN)** |                                                                                                                                                                                                             |
| RN1 - Antecedência Mínima | No passo FB2 do fluxo básico, eventos devem ser agendados com pelo menos 7 dias de antecedência. Caso contrário, o sistema exibe a mensagem: "O evento deve ser agendado com pelo menos 7 dias de antecedência." |
| **Pós-condições**       | O evento estará registrado no calendário da plataforma. Os refugiados e parceiros receberão notificações sobre o evento.                                                                                    |

### Especificação 2: Gerenciar Permissões de Usuários

| **Campo**               | **Descrição**                                                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Breve Descrição**     | Este caso de uso permite que um administrador do sistema gerencie as permissões de acesso dos usuários (refugiados, agências humanitárias e empregadores) na plataforma.                                      |
| **Atores**              | Administrador do sistema.                                                                                                                                                                                   |
| **Condições Prévias**   | O ator deve ter uma conta de administrador do sistema. O ator deve estar logado na plataforma.                                                                                                               |
| **Fluxo Básico (FB)**   |                                                                                                                                                                                                             |
| FB1                     | O ator acessa a seção "Gerenciar Permissões" na plataforma.                                                                                                                                                 |
| FB2                     | O sistema exibe uma lista de usuários cadastrados. [RN 7.4]                                                                                                                                                 |
| FB3                     | O ator seleciona o usuário cujas permissões deseja gerenciar. [RN 7.1]                                                                                                                                      |
| FB4                     | O sistema exibe as permissões atuais do usuário. [RN 7.1.1] [RN 7.1.2] [RN 7.1.3]                                                                                                                            |
| FB5                     | O ator clica em editar as permissões (adiciona, remove ou modifica). [FE 6.1.2] [RN 7.2]                                                                                                                     |
| FB6                     | O ator confirma as alterações.                                                                                                                                                                              |
| FB7                     | O sistema valida as alterações. [FE 6.1] [RN 7.2] [RN 7.3]                                                                                                                                                  |
| FB8                     | O sistema atualiza as permissões do usuário. [RN 7.1]                                                                                                                                                       |
| FB9                     | O sistema exibe uma mensagem de confirmação de que as permissões foram atualizadas com sucesso. [RN 7.5]                                                                                                    |
| FB10                    | O caso de uso é encerrado.                                                                                                                                                                                  |
| **Fluxo Alternativo (FA)** |                                                                                                                                                                                                             |
| FA1 - Não há fluxo alternativo |                                                                                                                                                                                                             |
| **Fluxo de Exceção (FE)** |                                                                                                                                                                                                             |
| FE1 - Validação Falha   | No passo FB7 do fluxo básico, se o sistema não validar as alterações nas permissões:                                                                                                                         |
| FE1.1                  | O sistema exibe uma mensagem de erro informando o motivo da falha na validação (ex.: permissões conflitantes, permissões inválidas, etc.).                                                                   |
| FE1.2                  | O sistema retorna ao passo FB5 do fluxo básico, permitindo que o administrador revise e corrija as permissões.                                                                                              |
| FE1.3                  | O administrador pode tentar novamente ou cancelar a operação.                                                                                                                                               |
| **Regra de Negócio (RN)** |                                                                                                                                                                                                             |
| RN1 - Permissões Padrão | Cada tipo de usuário tem um conjunto de permissões padrão que são atribuídas automaticamente no momento do cadastro:                                                                                        |
| RN1.1                  | Refugiados: Buscar, pesquisar, solicitar vagas/recursos e atualizar perfil.                                                                                                                                 |
| RN1.2                  | Agências Humanitárias: Planejar, executar, agendar ações e informar projetos.                                                                                                                               |
| RN1.3                  | Empregadores parceiros: Anunciar vagas, planejar e executar processos de recrutamento.                                                                                                                      |
| RN2 - Conflito de Permissões | Permissões conflitantes (ex.: um refugiado não pode ter permissões de administrador) não são permitidas.                                                                                                     |
| RN3 - Permissões Inválidas | Permissões inválidas ou fora do escopo do usuário não podem ser salvas.                                                                                                                                     |
| RN4 - Usuário Não Cadastrado | Se um usuário não estiver cadastrado, o sistema exibirá uma mensagem informando que tal usuário pesquisado não existe.                                                                                       |
| RN5 - Mensagens de Erro | O sistema deve fornecer mensagens em casos de falha na validação ou operação, indicando o motivo do erro e como corrigi-lo.                                                                                  |
| **Pós-condições**       | As permissões do usuário são atualizadas no sistema.                                                                                                                                                        |

### Especificação 3: Anunciar Vagas de Emprego

| **Campo**               | **Descrição**                                                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Breve Descrição**     | Permite que empregadores parceiros anunciem vagas de emprego na plataforma, conectando refugiados a oportunidades de trabalho.                                                                                |
| **Atores**              | Empregadores parceiros.                                                                                                                                                                                      |
| **Condições Prévias**   | O empregador deve estar logado na plataforma.                                                                                                                                                                 |
| **Fluxo Básico (FB)**   |                                                                                                                                                                                                             |
| FB1                     | O empregador seleciona a opção “Anunciar vagas de emprego”.                                                                                                                                                   |
| FB2                     | O sistema exibe um formulário para inserir as informações da vaga, incluindo: Título, Descrição, Requisitos, Benefícios, Prazo para receber candidaturas (RN02).                                           |
| FB3                     | O empregador preenche as informações da vaga (RN01).                                                                                                                                                         |
| FB4                     | O empregador seleciona a opção de “Publicar vaga”.                                                                                                                                                           |
| FB5                     | O sistema valida os dados preenchidos (FE01).                                                                                                                                                               |
| FB6                     | O sistema publica a vaga na plataforma.                                                                                                                                                                      |
| FB7                     | O sistema emite uma mensagem de confirmação.                                                                                                                                                                |
| FB8                     | O caso de uso é encerrado.                                                                                                                                                                                    |
| **Fluxo Alternativo (FA)** |                                                                                                                                                                                                             |
| FA1 - Editar vaga de emprego |                                                                                                                                                                                                          |
| FA1.1                   | O empregador seleciona uma vaga já criada.                                                                                                                                                                   |
| FA1.2                   | O empregador edita as informações da vaga.                                                                                                                                                                  |
| FA1.3                   | O empregador salva as alterações (FE01).                                                                                                                                                                    |
| FA2 - Remover vaga de emprego |                                                                                                                                                                                                          |
| FA2.1                   | O empregador seleciona uma vaga já criada.                                                                                                                                                                   |
| FA2.2                   | O empregador remove a vaga.                                                                                                                                                                                  |
| FA2.3                   | O sistema notifica os refugiados sobre a remoção.                                                                                                                                                           |
| **Fluxo de Exceção (FE)** |                                                                                                                                                                                                             |
| FE1 - Dados incompletos | No passo FB5 do fluxo básico, caso o empregador não preencha todos os campos obrigatórios, o sistema exibe a mensagem: “Preencha todos os campos obrigatórios para publicar a vaga”. O caso de uso retorna ao passo FB3 do FB. |
| **Regra de Negócio (RN)** |                                                                                                                                                                                                             |
| RN1 - Campos obrigatórios | No passo FB3 do fluxo básico, os campos título, descrição, requisitos, benefícios e prazo para receber candidaturas são obrigatórios estarem preenchidos para que a vaga possa ser publicada.               |
| RN2 - Prazo das candidaturas | No passo FB4 do fluxo básico, o prazo para candidaturas não pode ser inferior a um dia ou superior a um mês.                                                                                             |
| **Pós-condições**       | A vaga é publicada no sistema. A vaga fica disponível para visualização e candidatura na plataforma.                                                                                                       |


### Especificação 4: Criar Perfil de Refugiado

| **Campo**               | **Descrição**                                                                                                                                                                                                  |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Breve Descrição**     | O caso de uso permite que um refugiado crie um perfil na plataforma, fornecendo informações pessoais, necessidades específicas e detalhes sobre sua situação atual. O perfil é utilizado para conectar o refugiado a serviços essenciais, oportunidades de trabalho e redes de apoio. |
| **Atores**              | Refugiado.                                                                                                                                                                                                   |
| **Condições Prévias**   | O refugiado deve ter acesso à plataforma. O refugiado deve concordar com os termos de uso e política de privacidade da plataforma.                                                                             |
| **Fluxo Básico (FB)**   |                                                                                                                                                                                                              |
| FB1                     | O ator acessa a plataforma.                                                                                                                                                                                   |
| FB2                     | O ator seleciona a opção “Criar perfil de refugiado”.                                                                                                                                                          |
| FB3                     | O refugiado preenche o formulário com os seguintes dados: Nome completo, Idade e gênero, Localização atual, Tamanho da família, Necessidades específicas: abrigo, alimentos, assistência médica e educação.     |
| FB4                     | O refugiado confirma o envio do formulário. [RN7.2]                                                                                                                                                         |
| FB5                     | O sistema valida as informações fornecidas.                                                                                                                                                                  |
| FB6                     | O sistema cria o perfil do refugiado e atribui permissões padrão conforme o tipo de usuário. [RN7.1.1]                                                                                                       |
| FB7                     | O sistema exibe uma mensagem de confirmação de que o perfil foi criado com sucesso.                                                                                                                           |
| FB8                     | O sistema sugere serviços e recursos disponíveis com base nas informações fornecidas. [RN7.3]                                                                                                                |
| FB9                     | O caso de uso é encerrado.                                                                                                                                                                                     |
| **Fluxo Alternativo (FA)** | Não há fluxo alternativo.                                                                                                                                                                                     |
| **Fluxo de Exceção (FE)** |                                                                                                                                                                                                              |
| FE1 - Campos faltantes | No passo FB4, se o refugiado não preencher todos os campos obrigatórios: O sistema exibe uma mensagem indicando os campos faltantes. O refugiado retorna ao passo FB3 para completar o formulário.           |
| **Regra de Negócio (RN)** |                                                                                                                                                                                                              |
| RN1 - Permissões padrão | Cada tipo de usuário tem um conjunto de permissões padrão que são atribuídas automaticamente no momento do cadastro: Refugiados: Buscar, pesquisar, solicitar vagas/recursos e atualizar perfil.              |
| RN2 - Mensagens de erro | O sistema deve fornecer mensagens claras em casos de falha na validação ou operação, indicando o motivo do erro e como corrigi-lo.                                                                          |
| RN3 - Sugestão de serviços | O sistema deve sugerir serviços e recursos com base nas necessidades informadas pelo refugiado.                                                                                                               |
| **Pós-condições**       | O perfil do refugiado é criado e armazenado no sistema. O refugiado recebe uma mensagem de confirmação de que o perfil foi criado com sucesso.                                                                |


### Especificação 5: Participar de Projetos Comunitários

| **Campo**               | **Descrição**                                                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Breve Descrição**     | Permite que refugiados participem de projetos comunitários ao se inscreverem em iniciativas disponíveis na plataforma.                                                                                       |
| **Atores**              | Refugiados.                                                                                                                                                                                                   |
| **Condições Prévias**   | O refugiado deve ter um perfil na plataforma. O refugiado deve estar logado no seu perfil.                                                                                                                   |
| **Fluxo Básico (FB)**   |                                                                                                                                                                                                              |
| FB1                     | O refugiado acessa a seção "Projetos Comunitários".                                                                                                                                                            |
| FB2                     | O refugiado visualiza uma lista de projetos disponíveis (FE01).                                                                                                                                              |
| FB3                     | O refugiado seleciona um projeto de interesse.                                                                                                                                                                |
| FB4                     | O refugiado visualiza as informações referentes ao projeto selecionado.                                                                                                                                      |
| FB5                     | O refugiado clica na opção “Participar do projeto”.                                                                                                                                                          |
| FB6                     | O sistema valida a inscrição (FE02) (RN01).                                                                                                                                                                 |
| FB7                     | O sistema registra a inscrição e emite uma mensagem de sucesso.                                                                                                                                              |
| FB8                     | O sistema notifica o organizador do projeto.                                                                                                                                                                 |
| FB9                     | O caso de uso é encerrado.                                                                                                                                                                                    |
| **Fluxo Alternativo (FA)** |                                                                                                                                                                                                             |
| FA1 - Cancelar Inscrição |                                                                                                                                                                                                             |
| FA1.1                   | O refugiado seleciona um projeto no qual está inscrito.                                                                                                                                                      |
| FA1.2                   | O refugiado seleciona a opção de cancelar a inscrição.                                                                                                                                                       |
| FA1.3                   | O sistema cancela a inscrição do refugiado (RN02).                                                                                                                                                          |
| FA1.4                   | O sistema notifica o organizador sobre o cancelamento.                                                                                                                                                       |
| **Fluxo de Exceção (FE)** |                                                                                                                                                                                                             |
| FE1 - Lista de projetos indisponível | No passo FB2, caso não tenha projetos comunitários cadastrados ou disponíveis, o sistema emitirá uma mensagem dizendo: "Não há projetos disponíveis no momento". O caso de uso é encerrado. |
| FE2 - Refugiado já inscrito | No passo FB6, caso o refugiado já esteja inscrito no projeto selecionado, o sistema exibe a mensagem: "Você já está inscrito neste projeto." O caso de uso é encerrado.                             |
| **Regra de Negócio (RN)** |                                                                                                                                                                                                             |
| RN1 - Limite de inscrições por refugiado | No passo FB6, o refugiado só pode se inscrever em um número limitado de 3 projetos simultaneamente. Caso o limite seja atingido, o sistema exibe a mensagem: "Você atingiu o limite de inscrições em projetos comunitários." |
| RN2 - Cancelamento de inscrição | No passo FA1.3, o sistema deve permitir o cancelamento da inscrição até uma data limite definida pelo organizador do projeto. Após a data limite, o sistema exibe a mensagem: "O prazo para cancelar a inscrição neste projeto já expirou." |
| **Pós-condições**       | O refugiado está inscrito no projeto comunitário. O refugiado poderá receber informações adicionais sobre o projeto por meio da plataforma.                                                                |




## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 03/02/2025   | 1.0        | Adição dos atores e seus casos de uso        | Camila Careli              | Todos os Membros            |
| 03/02/2025   | 1.1        | Corrigindo erro da imagem do diagrama       | Brenno da Silva             | Todos os Membros            |
| 03/02/2025   | 2.0        | Adição das 5 especificações       | Camila Careli             | Todos os Membros            |
| 03/02/2025   | 2.1        | Adição do novo diagrama       | Camila Careli             | Todos os Membros            |