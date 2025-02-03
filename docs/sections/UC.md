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


## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 03/02/2025   | 1.0        | Adição dos atores e seus casos de uso        | Camila Careli              | Todos os Membros            |
| 03/02/2025   | 1.1        | Corrigindo erro da imagem do diagrama       | Brenno da Silva             | Todos os Membros            |