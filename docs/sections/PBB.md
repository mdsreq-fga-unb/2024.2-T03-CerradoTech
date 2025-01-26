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

### **US-01:   Como atendente, quero verificar a disponibilidade dos técnicos em tempo real para otimizar os agendamentos e evitar conflitos**

**Critério de aceitação para o BDD:**  A disponibilidade dos técnicos deve estar integrada ao sistema de agendamentos, permitindo que o atendente veja os serviços marcados e os horários disponíveis de forma clara e precisa.

*Cenário 1:* Dado que o atendente acessa o sistema de agendamentos,
Quando ele consulta a disponibilidade de técnicos para um novo agendamento,
Então o sistema deve exibir os técnicos disponíveis, com seus horários livres claramente indicados.

*Cenário 2:* Dado que o atendente tenta agendar um novo serviço em um horário já ocupado,
Quando ele visualiza as opções de horários,
Então o sistema deve exibir uma mensagem indicando que o horário está indisponível e sugerir horários alternativos.

### **US-02:    Como técnico, quero que os serviços sejam atualizados em tempo real, para  maior agilidade nas manutenções**

**Critério de aceitação para o BDD:**  O sistema deve notificar o técnico sobre novos serviços atribuídos, serviços finalizados com o respectivo feedback e a mudança do status do serviço, mantendo-o informado sobre suas tarefas em tempo real.

*Cenário 1:* Dado que um serviço foi atribuído a um técnico,
Quando o serviço for atribuído no sistema,
Então o técnico deve receber uma notificação em tempo real sobre a atribuição do serviço.

*Cenário 2:* Dado que um serviço foi finalizado,
Quando o status do serviço for alterado para "Concluído",
Então o técnico deve receber uma notificação informando sobre a mudança de status e a necessidade de fornecer feedback.

### **US-03:     Como técnico, quero registrar o status dos serviços em tempo real, para maior agilidade nas manutenções**

**Critério de aceitação para o BDD:** O sistema deve permitir que o técnico registre o status de cada serviço em tempo real: "em andamento", "concluído", "aguardando peças" e "solicitação aberta" para atualização imediata.

*Cenário 1:* Dado que o técnico está realizando um serviço,
Quando ele alterar o status para "Em andamento",
Então o sistema deve atualizar o status do serviço imediatamente para "Em andamento" e exibir essa atualização para o atendente e o cliente.

*Cenário 2:* Dado que o técnico completou um serviço,
Quando ele marcar o status como "Concluído",
Então o sistema deve atualizar o status para "Concluído" e registrar a conclusão de forma visível para todas as partes envolvidas.

### **US-04:  Como cliente, quero acompanhar solicitações de manutenção para notificar em tempo real**

**Critério de aceitação para o BDD:**  O sistema deve exibir, na página principal do portal de acompanhamento, uma lista com todas as solicitações do cliente, incluindo o status atualizado ("Solictação aberta", "Em andamento", "Concluído"), a data e hora de criação e o técnico designado.

*Cenário 1:* Dado que o cliente acessa a página de acompanhamento de suas solicitações,
Quando ele visualizar a lista de solicitações,
Então o sistema deve exibir o status atual de cada solicitação, a data de criação e o nome do técnico responsável.

*Cenário 2:* Dado que o cliente visualiza uma solicitação com o status "Em andamento",
Quando o status da solicitação for alterado para "Concluído",
Então o sistema deve atualizar automaticamente o status na página de acompanhamento.

### **US-16:    Como atendente, quero visualizar em tempo real o status das solicitações para fornecer informações transparentes aos clientes**

**Critério de aceitação para o BDD:**   A atendente deve acessar detalhes da solicitação: nome do cliente, tipo de serviço solicitado e histórico de interações.

*Cenário 1:* Dado que o atendente acessa o sistema e pesquisa a solicitação #5678,
Quando o atendente visualizar os detalhes da solicitação,
Então o sistema deve exibir o status atual da solicitação, o nome do cliente, tipo de serviço solicitado e o histórico de interações.

*Cenário 2:* Dado que o atendente acessa o sistema e pesquisa a solicitação #1234,
Quando o status da solicitação foi atualizado para "Em andamento",
Então o sistema deve exibir o status atual como "Em andamento" e as informações relevantes da solicitação.
 

---

## Histórias de usuário com Critérios de Aceitação: 13

###**US-04:      Como cliente, quero acompanhar solicitações de manutenção para notificar em tempo real**###

**Critérios de Aceitação:** 

- O sistema deve exibir, na página principal do portal de acompanhamento, uma lista com todas as solicitações do cliente, incluindo o status atualizado ("Solictação aberta", "Em andamento", "Concluído"), a data e hora de criação e o técnico designado.
- O cliente deve receber uma notificação em tempo real via push notification, e-mail ou SMS, conforme configurado, sempre que o status de uma solicitação for atualizado no sistema.

###**US-05:       Como cliente, quero dar feedback sobre os serviços para melhorar a eficiência dos serviços**

**Critérios de Aceitação:**  

- Após a conclusão de um serviço, o cliente deve conseguir acessar um formulário de feedback no sistema, vinculado à solicitação encerrada.
- Ao abrir o formulário de feedback, o cliente deve encontrar um campo de avaliação numérica (como 1 a 5 estrelas), perguntas sobre qualidade do atendimento, pontualidade e resolução do problema, além de um campo opcional para comentários adicionais.
- Após o cliente preencher o formulário de feedback e clicar em "Enviar", o sistema deve exibir uma mensagem de agradecimento, confirmando que o feedback foi registrado corretamente.

###**US-06:  Como cliente, quero acessar um chat com os atendentes para maior compreensão situacional dos atendimentos**

**Critérios de Aceitação:**  

- O sistema deve permitir que o cliente inicie um chat com um atendente disponível ao acessar a área de atendimento do sistema.
-  O sistema deve notificar o cliente quando um atendente estiver pronto para iniciar o atendimento via chat.

###**US-07:   Como cliente, quero ser notificado automaticamente quando as peças necessárias para o serviço estiverem disponíveis para ter transparência na solicitação**

**Critérios de Aceitação:** 

- Se as peças necessárias para o serviço sofrerem atraso, o sistema deve notificar o cliente imediatamente, fornecendo uma nova estimativa de disponibilidade.
- A notificação deve incluir o(os) nome(s) da(s) peças disponíveis.

###**US-08:    Como atendente, quero visualizar um calendário com os serviços agendados para ter menos erros de agendamento e retrabalho na agenda**

**Critérios de Aceitação:**  

- Ao selecionar um serviço no calendário, a atendente deve poder visualizar detalhes como o nome do cliente, tipo de serviço, data, hora e status do serviço agendado.
-  O sistema deve alertar a atendente quando ocorrerem dois serviços marcados para o mesmo horário.


###**US-09:     Como atendente, quero pesquisar informações de solicitações específicas para localizar dados rapidamente e ter um atendimento mais assertivo e ágil**

**Critérios de Aceitação:**  

-  A pesquisa deve ser realizada em tempo real, com resultados atualizados à medida que o atendente digita os termos de busca na barra de pesquisa.
-  O sistema deve exibir informações sobre o cliente, histórico de interações, status atual e qualquer comentário relevante.


###**US-10:      Como diretora de operações, quero supervisionar as atividades diárias da empresa em tempo real para monitorar o desempenho e corrigir problemas rapidamente**

**Critérios de Aceitação:**  

- O sistema deve permitir que a diretora de operações tome ações rápidas, com a redistribuição de tarefas e serviços, diretamente a partir da painel de supervisão.
- O painel deve exibir os indicadores de desempenho: número de serviços concluídos, tempo de resposta médio, taxa de satisfação do cliente e alertas sobre problemas (caso tenha).

###**US-11:       Como diretora de operações, quero consultar dados de produtividade, satisfação do cliente e eficiência operacional para ter clientes satisfeitos e empresa com boa reputação**

**Critérios de Aceitação:**  

-   O sistema deve fornecer acesso a dados sobre a satisfação do cliente dos questionários de feedback preenchidos pelos clientes.
-   O sistema deve permitir a comparação do desempenho atual com os períodos anteriores para avaliar a evolução da produtividade, satisfação e eficiência.

###**US-12:        Como diretora de operações, quero consultar um relatório diário de atividades realizadas para tomar decisões estratégicas embasadas em dados confiáveis**

**Critérios de Aceitação:**  

- O sistema de gerar um relatório que inclui indicadores-chave de performance (KPIs), como produtividade, taxa de conclusão no prazo, e satisfação do cliente, para ajudar na análise do desempenho diário.
- O relatório deve apresentar um resumo executivo destacando os principais pontos de desempenho e quaisquer alertas ou problemas críticos encontrados nas atividades realizadas.

###**US-13:       Como diretora de operações, quero visualizar dados coletados dos feedbacks dos clientes para identificar pontos fortes e áreas que precisam de melhorias**

**Critérios de Aceitação:**  

-  O sistema deve fornecer uma análise dos pontos fortes: qualidade do atendimento e eficiência do serviços, e áreas que precisam de melhorias: pontualidade e resolução de problemas, com base nos feedbacks recebidos.
-  O sistema deve permitir que os feedbacks sejam agrupados pelas categorias: atendimento, qualidade do serviço e experiência geral para facilitar a análise detalhada.

###**US-14:        Como técnico, quero acessar um diagnóstico automatizado para solucções mais rápidas e precisas**

**Critérios de Aceitação:**  

- Após o diagnóstico, o sistema deve apresentar sugestões de soluções baseadas nos resultados, como etapas de reparo ou peças necessárias.
- O diagnóstico deverá ter check-box dos problemas do cliente atual

###**US-15:         Como técnico, quero consultar o histórico completo de equipamentos, para  diagnósticos mais rápidos e precisos**

**Critérios de Aceitação:**  

- O sistema deve permitir que o técnico consulte o histórico completo de qualquer equipamento, incluindo manutenções anteriores, falhas reportadas e reparos realizados.
- O sistema deve permitir que o técnico filtre o histórico por tipo de serviço, data e tipo de problema, para facilitar a busca pelas informações mais relevantes.


###**US-16:          Como atendente, quero visualizar em tempo real o status das solicitações para fornecer informações transparentes aos clientes**

**Critérios de Aceitação:** 

- A atendente deve acessar detalhes da solicitação: nome do cliente, tipo de serviço solicitado e histórico de interações.
- O sistema deve notificar o atendente por push notification sobre quaisquer mudanças no status de uma solicitação: atualização de data, peças disponíveis ou indisponíveis e técnicos agendados.

---
## Histórias de usuário: 8

**US-17:    Como cliente, quero receber notificações sobre o andamento das solicitações feitas para notificar em tempo real**

**US-18:     Como cliente, quero receber alertas automáticos sobre o tempo de execução do serviço para ter um atendimento mais rápido**

**US-19:      Como atendente, quero receber notificações automáticas sobre o serviço agendado para manter o cliente e o técnico atualizados**

**US-20:       Como atendente, quero receber notificações automáticas de mudanças no status das solicitações para informar os clientes e  aumentar da satisfação dos clientes**

**US-21:        Como atendente, quero visualizar informações como o número de solicitações resolvidas e prazos cumpridos para ter um atendimento mais assertivo e ágil**

**US-22:         Como técnico, quero gerar relatórios automáticos sobre serviços realizados, para  diagnósticos mais rápidos e precisos**

**US-23:         Como diretora de operações, quero filtrar categorias das atividades diárias por tipo, status e responsável para gerenciar a equipe de técnicos de forma mais eficiente**

**US-24:         Como diretora de operações, quero receber relatórios de custos operacionais e oportunidades de economia para otimizar os recursos da empresa e reduzir despesas**







## Histórico de Versão

| **Data**     | **Versão** | **Descrição**                                       | **Autor**                    | **Revisores**               |
|--------------|------------|-----------------------------------------------------|------------------------------|-----------------------------|
| 16/01/2025   | 1.0        | Adição da tabela contendo os cenários do BDD        | Brenno da Silva              | Todos os Membros            |
| 20/01/2025   | 1.1        | Adição do template e suas informações        | Camila Careli              | Todos os Membros            |
| 25/01/2025   | 2.0        | Melhoria dos critérios de aceitação        | Camila Careli              | Todos os Membros            |