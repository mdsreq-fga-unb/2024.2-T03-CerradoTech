Segundo Marsicano, o Product Backlog Building (PBB) é um método para a elaboração e criação de um Product Backlog, enquanto o Canvas PBB é a ferramenta que facilita o método de Product Backlog Building.

O objetivo do PBB é ajudar na construção e no refinamento do Product Backlog de forma colaborativa – construindo um entendimento compartilhado e levando todos os envolvidos à compreensão do produto – e na preparação do backlog para o time começar a trabalhar de modo ágil e eficaz.



## Estudo de Caso
A TechFix, sendo uma empresa fictícia para estudo de caso da Unidade 3, serve como base para analisar e propor soluções para os desafios enfrentados em seu processo operacional e no atendimento aos clientes.

[Clique aqui para ver o Canvas PBB no site Mural!   ](https://app.mural.co/t/requisitos202426345/m/requisitos202426345/1736424664775/6a892ecbc673849e9dc6fc8ce77937f31bc2e5a5?sender=uc51955fc553d725822bc4698)

## Problemas 
1. Falha na Comunicação Interna
2. Informações Esquecidas ou Mal Registradas na Solicitação de Serviços
3. Sistemas Não Integrados e Não Centralizados
4. Conflitos na Disponibilidade dos Técnicos
5. Histórico de Clientes Feitos em Diferentes Formas
6. Questionários de Feedback Manuais com Baixa Taxa de Resposta
7. Anotações Manuais
8. Necessidade de Redigitação de Informações
9. Atrasos nos Serviços e Entrega de Peças

## Expectativas
1. Integração de Sistema e Centralização de Informações
2. Automação na Coleta e Análise de Respostas do Feedback do Cliente para Agilizar Melhorias
3. Consultar Históricos de Serviços
4. Relatórios Automatizados
5. Notificações do Processo de Manutenção e Agendamento
6. Histórico de Atendimentos
7. Questionários Personalizados para Diferentes Tipos de Serviços
8. Processos Padronizados
9. Acompanhar Solicitações em Andamento e Localização dos Técnicos
10. Registrar os Atendimentos em Tempo Real


## Personas 

| **PERSONA:**     | **O que ela FAZ**                                                                 | **O que ela QUER FAZER**                                                             |
|-------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **Cliente Corporativo** | Solicita   manutenções e reparos regulares de equipamentos                           | Receber respostas ágeis para emergências .              |
|                         | Solicita  suporte técnico emergencial                    | Fornecer feedback automatizado sobre os serviços                   |
|                         | Solicita atualização de sistemas de segurança           | Acompanhar solicitações de serviço em tempo real, com atualizações constantes sobre o status          |
| **Atendente** | Organizar e gerenciar as solicitações de serviço com os agendamentos                         | Fazer o agendamento e comunicação com informações centralizadas dos clientes     |
|                         | Fornecer  informações aos clientes                             | Utilizar um sistema automático de notificações     |
|                         |                | Evitar conflitos de agenda     |
| **Técnico de Campo** |  Realiza manutenções e reparos em equipamentos eletrônicos                  | Utilizar um sistema móvel para as visitas de campo no qual registre os serviços em tempo real |
|                         | Atende clientes com diferentes tipos de problemas técnicos                      |  Visitas produtivas, garantindo atendimento ao cliente certo na data e hora corretas   |
|                         |               | Acessar ao histórico detalhado dos equipamentos e os guias técnicos |
| **Diretora de Operações** |  Supervisiona as atividades diárias da empresa                   | Utilizar relatórios datalhados para embasar decisões estratégicas |
|                         | Busca melhorar a produtividade, a satisfação do cliente e a eficiência da empresa                      |  Monitorar processos de desempenho em tempo real   |


## Features e PBI
As features correspondem ao passo 5, que são as funcionalidades com seus problemas e benefícios. Já o Product Bcklog Items (PBI) é o passo 6, derivado do passo 5. O PBI também possui uma priorização, a qual é calculada com base na frequência de uso **somando** com o valor de negócio.

**Frequência de uso:**

- **HORA A HORA (5):** utilizado mais de uma vez no dia.
- **DIÁRIO (4):** utilizado uma vez ao dia, pelo menos.
- **SEMANAL (3):** utilizado uma, duas ou três vezes na semana.
- **MENSAL (2):** utilizado uma vez no mês ou um pouco mais de uma vez.
- **TRIMESTRAL (1):** utilizado, pelo menos, uma vez a cada três meses.


**Valor de negócio:**

- **ALTO (3):** muito importante, principal, algo com um valor de negócio alto.
- **MÉDIO (2):** algo que tem relevância, um valor de negócio médio.
- **BAIXO (1):** algo que faz sentido, mas que não agrega muito valor no
momento atual, um valor de negócio baixo.

### Cliente Corporativo

| **Funcionalidades**                                    | Problemas                                              | Benefícios                                              | **PBIs**                                               | **Prioridade** |
|--------------------------------------------------------|-------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------|----------------|
| **Solicitar e acompanhar manutenções e reparos regulares de equipamentos** | Falta de previsibilidade                               | Maior compreensão situacional dos atendimentos         | Acompanhar solicitações de manutenção para aumentar a previsibilidade e reduzir atrasos. | 8              |
|                                                        | Problema de comunicação                                 | Notificações em tempo real                             | Acessar chat com atendente para receber suporte e esclarecer dúvidas sobre as solicitações. | 7              |
|                                                        |                                                       |                                                        | Receber notificações para monitorar o andamento das solicitações feitas. | 6              |
| **Fornecer feedback automatizado sobre os serviços**   | Serviços demorados e atrasados                         | Atendimento rápido                                      | Enviar feedback automatizado sobre o status dos serviços para informar sobre o progresso e possíveis atrasos | 8              |
|                                                        | Falta de peças disponíveis                             | Transparência na sua solicitação                       | Notificar automaticamente a disponibilidade de peças necessárias para o serviço, garantindo agilidade e evitando frustrações. | 7              |
|                                                        | Problemas logísticos                                   | Melhorar a eficiência dos serviços                     | Gerar alertas automáticos sobre o tempo de execução do serviço, informando os clientes caso o tempo estimado seja superado | 6              |



### Atendente

| **Funcionalidades**                                    | Problemas                                              | Benefícios                                              | **PBIs**                                               | **Prioridade** |
|--------------------------------------------------------|-------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------|----------------|
| **Organizar e gerenciar as solicitações de serviço com os agendamentos** | Falta de informações centralizadas                     | Melhor comunicação com os clientes                     | Verificar disponibilidade de técnicos em tempo real para otimizar agendamentos. | 7              |
|                                                        | Erros e conflitos no agendamento                       | Centralização de informações                            | Visualizar calendário com a data e horário dos serviços agendados para evitar conflitos de agendamentos. | 7              |
|                                                        | Frustração dos clientes                                | Menos erros de agendamento e retrabalho na agenda      | Enviar notificações automáticas aos clientes para reduzir frustrações e mantê-los informados. | 7              |
| **Fornecer informações aos clientes**                  | Maior tempo de espera para dar a informação            | Transparência nos agendamentos                          | Visualizar em tempo real o status das solicitações.    | 8              |
|                                                        | Inconsistências no agendamento                         | Aumento da satisfação dos clientes                      | Pesquisar informações de solicitações específicas.     | 7              |
|                                                        | Feedback negativo sobre a empresa                      | Atendimento mais assertivo e ágil                       | Receber notificações automáticas de mudanças no status das solicitações. | 7              |
|                                                        |                                                       |                                                        | Visualizar informações como número de solicitações resolvidas e prazos cumpridos. | 6              |



### Técnico de Campo

| **Funcionalidades**                                    | Problemas                                              | Benefícios                                              | **PBIs**                                               | **Prioridade** |
|--------------------------------------------------------|-------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------|----------------|
| **Realizar manutenções e reparos**                     | Falta de acesso histórico de manutenção e a manuais técnicos | Maior agilidade nas manutenções                         | Atualizar serviços em tempo real para eliminar retrabalho e aumentar eficiência. | 8              |
|                                                        | Dificuldade em diagnósticos                            | Diagnósticos mais rápidos e precisos                    | Utilizar diagnósticos automatizados para auxiliar nas manutenções e reduzir o tempo de análise | 8              |
|                                                        |                                                       |                                                        | Enviar notificações sobre peças disponíveis para informar técnicos e evitar atrasos | 7              |
|                                                        |                                                       |                                                        | Registrar históricos de manutenções para garantir acesso aos dados | 7              |
| **Acessar ao histórico detalhado**                     | Falta de diagnósticos rápidos e precisos               | Atualização dos serviços nas visitas de campo em tempo real | Registrar atualização em tempo real do status para permitir acompanhamento e aumentar transparência | 8              |
|                                                        | Ausência de ferramentas e/ou informações técnicas     | Acesso a manuais e histórico dos equipamentos          | Acessar histórico de equipamentos para facilitar acesso e melhorar diagnósticos | 8              |
|                                                        |                                                       |                                                        | Gerar relatórios automáticos de serviços para oferecer dados para tomada de decisões | 7              |




### Diretora de Operações
### Cliente Corporativo

| **Funcionalidades**                                    | Problemas                                              | Benefícios                                              | **PBIs**                                               | **Prioridade** |
|--------------------------------------------------------|-------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------|----------------|
| **Supervisionar atividades diárias da empresa**        | Sistemas desatualizados e relatórios inconsistentes    | Dados confiáveis nos relatórios                         | Supervisionar as atividades diárias da empresa em tempo real | 8              |
|                                                        | Problemas de visibilidade sobre o desempenho das equipes | Decisões estratégicas embasadas em dados confiáveis     | Consultar relatório diário de atividades realizadas para análise de desempenho e identificação de possíveis melhorias nos processos | 7              |
|                                                        | Problemas em acompanhar o andamento das solicitações dos clientes | Monitorar o desempenho da equipe                       | Filtrar categorias das atividades diárias por tipo, status e responsável, para permitir um gerenciamento mais eficiente dos técnicos | 6              |
| **Melhorar produtividade, satisfação do cliente e eficiência da empresa** | Locação ineficiente de recursos                        | Melhor locação dos recursos da empresa                  | Consultar dados de produtividade, satisfação do cliente e eficiência operacional para facilitar a tomada de decisões | 6              |
|                                                        | Aumento de custos operacionais e perda de oportunidades de melhoria | Queda de custos operacionais e mais melhorias para a empresa | Visualizar dados coletados dos feedbacks dos clientes para análise de satisfação | 5              |
|                                                        | Satisfação do cliente e reputação da empresa ruins      | Clientes satisfeitos e empresa com boa reputação        | Receber relatórios de custos operacionais e oportunidades de economia | 5              |

---

## Histórias de usuário com Critérios de Aceitação e BDD's: 5

### **US-01:  Como cliente, quero acompanhar solicitações de manutenção para notificar em tempo real**

**Critério de aceitação:**  O sistema deve exibir o status atual de cada solicitação de manutenção (pendente, em andamento, concluída)

*Cenário 1:* O sistema deve exibir o status atual de cada solicitação de manutenção. Dado que o cliente acessa o sistema de acompanhamento de manutençãoE existe uma solicitação de manutenção com status incorretamente registrado no banco de dadosQuando o cliente visualiza a lista de solicitaçõesEntão o sistema exibe uma mensagem de erro "Erro ao carregar o status da solicitação" e sugere que o cliente entre em contato com o suporte técnico.  

*Cenário 2:* O sistema deve exibir o status atual de cada solicitação de manutenção.Dado que o cliente acessa o sistema de acompanhamento de manutenção E existe uma solicitação de manutenção com status "em andamento"Quando o cliente visualiza a lista de solicitaçõesEntão o sistema exibe o status "em andamento" corretamente ao lado da solicitação.  

### **US-02:   Como atendente, quero verificar a disponibilidade dos técnicos em tempo real para otimizar os agendamentos e evitar conflitos**

**Critério de Aceitação:**  sistema deve exibir a agenda atualizada de cada técnico em tempo real 

*Cenário 1:* O sistema deve exibir a agenda atualizada de cada técnico em tempo real.Dado que o atendente acessa o sistema e seleciona o técnico Maria SouzaE o sistema está fora do ar devido a uma falha de conexãoQuando o atendente tenta verificar a agenda de Maria SouzaEntão o sistema exibe a mensagem "Agenda indisponível no momento. Tente novamente mais tarde".  

*Cenário 2:* O sistema deve exibir a agenda atualizada de cada técnico em tempo real.Dado que o atendente acessa o sistema e seleciona o técnico João Silva e a agenda do técnico está atualizada no sistemaQuando o atendente verifica a agenda do dia 15/01/2025Então o sistema exibe as informações: "9h - Cliente A, 11h - Cliente B, 14h - Cliente C".  

### **US-03:    Como atendente, quero visualizar em tempo real o status das solicitações para fornecer informações transparentes aos clientes**

**Critério de Aceitação:**   O sistema deve exibir o status atual de cada solicitação (pendente, em andamento, concluída)

*Cenário 1:*O sistema deve exibir o status atual de cada solicitação. Dado que o atendente acessa o sistema e pesquisa a solicitação #5678 E o sistema está indisponível devido a uma falha internaQuando o atendente tenta visualizar os detalhes da solicitaçãoEntão o sistema exibe a mensagem "Status indisponível no momento. Tente novamente mais tarde".   

*Cenário 2:* O sistema deve exibir o status atual de cada solicitação.Dado que o atendente acessa o sistema e pesquisa a solicitação #1234 E o status da solicitação está atualizado no sistemaQuando o atendente visualiza os detalhes da solicitaçãoEntão o sistema exibe o status atual como "Em andamento".  

### **US-04:    Como técnico, quero que os serviços sejam atualizados em tempo real, para  maior agilidade nas manutenções**

**Critério de Aceitação:**    As atualizações feitas por qualquer usuário devem refletir imediatamente no sistema

*Cenário 1:* As atualizações feitas por qualquer usuário devem refletir imediatamente no sistema.   Dado que o técnico João Silva atualiza o status do serviço #7890 para "Concluído" às 16:00 e o cliente acessa o portal para verificar o status às 16:10Quando o cliente visualiza as informações no sistema Então o status exibido ainda é "Em andamento", e o sistema exibe a mensagem "Atualização pendente. Tente novamente mais tarde".   

*Cenário 2:* As atualizações feitas por qualquer usuário devem refletir imediatamente no sistema.   Dado que o técnico Maria Souza atualiza o status do serviço #5678 para "Em andamento" às 15:00 e o gerente operacional consulta o status do mesmo serviço às 15:01 Quando ele visualiza as informações no sistemaEntão o status exibido é "Em andamento", atualizado às "15:00 por Maria Souza".    

### **US-05:     Como técnico, quero registrar o status dos serviços em tempo real, para maior agilidade nas manutenções**

**Critério de Aceitação:**   O status de cada serviço deve ser atualizado automaticamente no sistema após qualquer alteração 

*Cenário 1:*  O status de cada serviço deve ser atualizado automaticamente no sistema após qualquer alteração.   Dado que o técnico Maria Souza tenta alterar o status do serviço #5678 para "Concluído"E ocorre uma falha de conexão com o sistemaQuando ela confirma a alteraçãoEntão o sistema exibe a mensagem "Atualização não realizada. Verifique sua conexão e tente novamente"E o status do serviço permanece inalterado.  

*Cenário 2:* O status de cada serviço deve ser atualizado automaticamente no sistema após qualquer alteração.  Dado que o técnico João Silva está logado no sistema e altera o status do serviço #1234 para "Em andamento" às 14:30Quando ele confirma a atualizaçãoEntão o sistema atualiza automaticamente o status do serviço para "Em andamento" e exibe a data e hora da última alteração como "10/01/2025 às 14:30".  

---

## Histórias de usuário com Critérios de Aceitação: 13

###**US-06:      Como cliente, quero acompanhar solicitações de manutenção para notificar em tempo real**###

**Critérios de Aceitação:**    O tempo estimado de conclusão de cada solicitação deve ser exibido ao lado do status

###**US-07:       Como cliente, quero dar feedback sobre os serviços para melhorar a eficiência dos serviços**

**Critérios de Aceitação:**  

- O sistema deve conter um questionário para passar o feedback
- A notificação deve ser enviada no máximo 5 minutos após a alteração de status do serviço

###**US-08:  Como cliente, quero acessar um chat com os atendentes para maior compreensão situacional dos atendimentos**

**Critérios de Aceitação:**  

-  Como cliente, quero acessar um chat com os atendentes para maior compreensão situacional dos atendimentos
-  O chat deve suportar envio de texto, imagens e documentos para facilitar a comunicação

###**US-09:   Como cliente, quero ser notificado automaticamente quando as peças necessárias para o serviço estiverem disponíveis para ter transparência na solicitação**

**Critérios de Aceitação:** O sistema deve enviar uma notificação automática assim que as peças necessárias para o serviço estiverem disponíveis no estoque 

###**US-10:    Como atendente, quero visualizar um calendário com os serviços agendados para ter menos erros de agendamento e retrabalho na agenda**

**Critérios de Aceitação:**  

- O calendário deve exibir os serviços agendados, incluindo cliente, local e horário 
-  Conflitos de agendamento devem ser destacados com alertas visuais


###**US-11:     Como atendente, quero pesquisar informações de solicitações específicas para localizar dados rapidamente e ter um atendimento mais assertivo e ágil**

**Critérios de Aceitação:**  

-  O sistema deve exibir os detalhes da solicitação, como técnico responsável e prazo estimado
-   Deve ser possível buscar solicitações por número, nome do cliente ou data


###**US-12:      Como diretora de operações, quero supervisionar as atividades diárias da empresa em tempo real para monitorar o desempenho e corrigir problemas rapidamente**

**Critérios de Aceitação:**  

-   O sistema deve exibir um painel consolidado com as atividades diárias em tempo real 
-    As informações no painel devem incluir status, responsável e tempo estimado de conclusão de cada atividade


###**US-13:       Como diretora de operações, quero consultar dados de produtividade, satisfação do cliente e eficiência operacional para ter clientes satisfeitos e empresa com boa reputação**

**Critérios de Aceitação:**  

-    Deve ser possível filtrar dados por período, equipe ou setor 
-     O sistema deve exibir métricas consolidadas de produtividade, satisfação e eficiência em um painel único   

###**US-14:        Como diretora de operações, quero consultar um relatório diário de atividades realizadas para tomar decisões estratégicas embasadas em dados confiáveis**

**Critérios de Aceitação:**  

-     O sistema deve gerar relatórios diários automaticamente com informações sobre atividades concluídas, atrasadas e em andamento
-      O relatório deve incluir gráficos e métricas como taxa de conclusão, média de tempo por tarefa e responsáveis

###**US-15:       Como diretora de operações, quero visualizar dados coletados dos feedbacks dos clientes para identificar pontos fortes e áreas que precisam de melhorias**

**Critérios de Aceitação:**  

-     O sistema deve gerar relatórios diários automaticamente com informações sobre atividades concluídas, atrasadas e em andamento
-       Deve ser possível filtrar os feedbacks por data, tipo de serviço ou região

###**US-16:        Como técnico, quero acessar um diagnóstico automatizado   Diagnósticos mais rápidos e precisos**

**Critérios de Aceitação:**  

-     O sistema deve gerar um relatório automatizado baseado nos sintomas informados
-       Devem ser sugeridas possíveis causas e soluções para o problema identificado

###**US-17:         Como técnico, quero consultar o histórico completo de equipamentos, para  diagnósticos mais rápidos e precisos**

**Critérios de Aceitação:**  

-      O histórico deve exibir registros de manutenções anteriores, peças substituídas e serviços realizados
-        Deve ser possível buscar registros por número de série, cliente ou data


###**US-18:          Como atendente, quero visualizar em tempo real o status das solicitações para fornecer informações transparentes aos clientes**

**Critérios de Aceitação:**   O status deve estar disponível com filtro por cliente ou número da solicitação


---
## Histórias de usuário: 8

**US-19:    Como cliente, quero receber notificações sobre o andamento das solicitações feitas para notificar em tempo real**

**US-20:     Como cliente, quero receber alertas automáticos sobre o tempo de execução do serviço para ter um atendimento mais rápido**

**US-21:      Como atendente, quero receber notificações automáticas sobre o serviço agendado para manter o cliente e o técnico atualizados**

**US-22:       Como atendente, quero receber notificações automáticas de mudanças no status das solicitações para informar os clientes e  aumentar da satisfação dos clientes**

**US-23:        Como atendente, quero visualizar informações como o número de solicitações resolvidas e prazos cumpridos para ter um atendimento mais assertivo e ágil**

**US-24:         Como técnico, quero gerar relatórios automáticos sobre serviços realizados, para  diagnósticos mais rápidos e precisos**

**US-25:         Como diretora de operações, quero filtrar categorias das atividades diárias por tipo, status e responsável para gerenciar a equipe de técnicos de forma mais eficiente**

**US-26:         Como diretora de operações, quero receber relatórios de custos operacionais e oportunidades de economia para otimizar os recursos da empresa e reduzir despesas**







## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 16/01/2025   | 1.0        | Adição da tabela contendo os cenários do BDD        | Brenno da Silva              | Todos os Membros            |
| 20/01/2025   | 1.0        | Adição do template e suas informações        | Camila Careli              | Todos os Membros            |