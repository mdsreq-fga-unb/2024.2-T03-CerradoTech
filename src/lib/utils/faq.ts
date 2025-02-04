/* eslint-disable max-len */
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class FAQ {
    readonly duvidas ={
        home: [
            {
                pergunta: 'Sobre o aplicativo',
                resposta: 'Este aplicativo é uma iniciativa do CEGAFI/UnB em parceria com a Finatec e apoio do Instituto Internacional de Educação no Brasil (IIEB) e do Fundo de Parceria para Ecossistemas Críticos (CEPF) e tem como principal função apoiar a coleta e gestão de informações socioprodutivas e de monitoramento da recomposição da vegetação nativa baseado no Protocolo de Monitoramento da Recomposição da Vegetação Nativa no Distrito Federal (Sousa e Viera, 2017) e na Nota Técnica IBRAM 01/2018.',
                fonte: ''
            },
        ],
        imovelLista: [
            {
                pergunta: 'Meus imóveis',
                resposta: 'Nessa tela você pode acompanhar seus imóveis cadastrados, cadastrar novos imóveis e recuperar imóveis salvos na nuvem.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Como cadastrar um novo imóvel?',
                resposta: 'Para cadastrar um novo imóvel, basta clicar no botão azul com o símbolo de adição (+) e preencher as informações solicitadas.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Como recuperar imóveis cadastrados anteriormente?',
                resposta: 'Caso você já tenha preenchido anteriormente dados sobre seu imóvel utilizando o aplicativo ou a plataforma Radis Cerrado e tenha enviado para as nossas bases de dados, você pode recuperar estas informações clicando no botão verde com o ícone da nuvem (é necessário possuir conexão com a internet para realizar esta operação). Mas atenção, ao fazer isso você vai sobrescrever todos os dados que você ainda não tenha enviado. Portanto sempre é importante enviar seus imóveis sempre que possível!',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Como iniciar o processo de monitoramento da recomposição nativa?',
                resposta: 'Para iniciar o monitoramento da recomposição nativa primeiramente você deve cadastrar o imóvel em que deseja fazer o monitoramento, feito isso você deve escolher a opção "monitoramento" e adicionar um novo polígono e posteriormente preencher as informações sobre as parcelas deste polígono.',
                fonte: '',
                img: '',
            }
        ],
        imovelDetalhe: [
            {
                pergunta: 'Detalhes do imóvel',
                resposta: 'Nesta página você pode conferir as informações cadastrais sobre o seu imóvel e realizar ações em seu imóvel, como por exemplo: Começar a fazer o monitoramento do imóvel, nos contar a respeito das informações socioprodutivas dos moradores. E também é possível editar ou excluir as informações cadastradas anteriormente.',
                fonte: ''
            },
            {
                pergunta: 'O que é Enviar meu imóvel?',
                resposta: 'Como o aplicativo Radis Cerrado trabalha o tempo todo offline, todos os seus dados ficam apenas no seu dispositivo, estando suscetível a perda de dados. Ao enviar seus dados para a núvem você pode recuperá-los a qualquer momento e também usar a plataforma Radis Cerrado para visualizar seus dados, construir seu PRADA e muito mais.',
                fonte: ''
            },
        ],
        imovelFormulario: [
            {
                pergunta: 'Cadastrar meu imóvel',
                resposta: 'O imóvel é a informação base de todo o aplicativo, é nele que você irá realizar o seu monitoramento cadastrando seus polígonos e parcelas conforme indicado pelo protocolo.',
                fonte: ''
            },
        ],
        socioprodutivoLista: [
            {
                pergunta: 'Página de Diagnóstico',
                resposta: 'Para preencher um novo questionário do diagnóstico socioprodutivo clique no botão de adicionar (+) localizado no canto inferior direito da tela.',
                fonte: ''
            },
        ],
        socioprodutivoFormulario: [
            {
                pergunta: 'O que é DAP?',
                    resposta: 'A Declaração de Aptidão ao Programa Nacional de Fortalecimento da Agricultura Familiar (DAP) é o instrumento utilizado para identificar e qualificar as Unidades Familiares de Produção Agrária da agricultura familiar e suas formas associativas organizadas em pessoas jurídicas.',
                    fonte: 'https://www.gov.br/agricultura/pt-br/assuntos/agricultura-familiar/dap',
            },
        ],
        poligonoLista: [
            {
                pergunta: 'Polígono de recomposição',
                resposta: 'Área ambientalmente homogênea com relação à vegetação original e uso do solo, que recebe o mesmo método de recomposição em um mesmo período, cujo resultado da recomposição esperado é homogêneo. Um polígono pode ser uma área contínua ou ser “descontínuo”, formado por um conjunto de áreas homogêneas separadas.',
                fonte: 'http://www.sema.df.gov.br/wp-conteudo/uploads/2017/09/Cartilha-Protocolo-de-Monitoramento-Vegeta%C3%A7%C3%A3o-Nativa.pdf',
                img: '',
            }
        ],
        poligonoFormulario: [
            {
                pergunta: 'O que é APP?',
                resposta: 'Área protegida, coberta ou não por vegetação nativa, com a função ambiental de preservar os recursos hídricos, a paisagem, a estabilidade geológica e a biodiversidade, facilitar o fluxo gênico de fauna e flora, proteger o solo e assegurar o bem-estar das populações humanas.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'O que é ARL?',
                resposta: 'Área protegida, coberta ou não por vegetação nativa, com a função ambiental de preservar os recursos hídricos, a paisagem, a estabilidade geológica e a biodiversidade, facilitar o fluxo gênico de fauna e flora, proteger o solo e assegurar o bem-estar das populações humanas.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'O que é AUR?',
                resposta: 'Área protegida, coberta ou não por vegetação nativa, com a função ambiental de preservar os recursos hídricos, a paisagem, a estabilidade geológica e a biodiversidade, facilitar o fluxo gênico de fauna e flora, proteger o solo e assegurar o bem-estar das populações humanas.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'O que é AUA?',
                resposta: 'Consiste em substituir a vegetação nativa e formações sucessoras por outras coberturas do solo, como atividades agropecuárias, industriais, de geração e transmissão de energia, de mineração e de transporte, assentamentos urbanos ou outras formas de ocupação humana.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'Formação vegetal - Florestal',
                resposta: 'Vegetação fechada com árvores próximas e dossel contínuo.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'Formação vegetal - Savânica',
                resposta: 'Vegetação aberta com árvores esparsas e dossel descontínuo.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'Formação vegetal - Campestre',
                resposta: 'Vegetação aberta sem árvores e sem dossel',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            },
            {
                pergunta: 'O que é fitofisionomia?',
                resposta: 'São os tipos de vegetação presentes em um determinado bioma. Em cada bioma ou região existem fitofisionomias ou tipos predominantes de vegetação.',
                fonte: 'https://www.webambiente.gov.br/publico/glossario.xhtml',
                img: '',
            }
        ],
        poligonoDetalhe: [
            {
                pergunta: 'Informações do polígono',
                resposta: 'Aqui você pode conferir as informações do seu polígono, edita-las e se estiver tudo correto, pode começar o monitoramento, onde primeiramente você irá escolher o ano que deseja monitorar (0 à 10) e finalmente iniciar a coleta de informações nas suas parcelas.',
                fonte: ''
            },
            {
                pergunta: 'Estatísticas do monitoramento',
                resposta: 'Após finalizar a coleta de informações do seu monitoramento você também encontrará os principais indicadores referentes ao último ano do monitoramento coletado nesta tela de detalhes do seu polígono. Portanto não deixe de coletar as informações sobre todas as suas parcelas para ter a informação mais precisa possível!',
                fonte: ''
            },
        ],
        parcelaMonitoramento: [
            {
                pergunta: 'Monitoramento do polígono',
                resposta: 'É aqui que começa o monitoramento de verdade! Primeiramente você deverá escolher qual ano deseja monitorar, sendo desde o ano inicial de monitoramento (ano zero) até o décimo ano. Ao fazer isso o aplicativo irá criar automaticamente o número de parcelas sugeridas pelo protocolo baseado na área do seu polígono que já cadastramos anteriormente.',
                fonte: ''
            },
            {
                pergunta: 'Eu já faço o monitoramento a alguns anos, posso usar o aplicativo mesmo assim?',
                resposta: 'Sim! E para isso temos duas opções diferentes, caso você tenha anotado as informações do seu monitoramento em algum lugar, você pode inseri-las retroativamente no aplicativo sem nenhum problema. E caso você não tenha todas as informações necessárias, não se preocupe! O aplicativo permite que você comece a registrar seu monitoramente a partir de qualquer ano.',
                fonte: ''
            },
            {
                pergunta: 'O que é a quantidade sugerida de parcelas?',
                resposta: 'O protocolo de monitoramento exige um número mínimo de parcelas baseado no tamanho do seu polígono, esse número mínimo é o que chamamos de quantidade sugerida ou parcelas sugeridas.',
                fonte: ''
            },
        ],
        parcelaLista: [
            {
                pergunta: 'Lista de Parcelas',
                resposta: 'Aqui você encontrará a lista de parcelas relativas ao ano de monitoramento selecionado na tela anterior para o seu polígono. O aplicativo criou essas parcelas automaticamente usando como referência a área do seu polígono, esse é o "número sugerido" de parcelas. Mas caso queira você pode acrescentar quantas parcelas quiser até o limite de 50 parcelas por polígono.',
                fonte: ''
            },
            {
                pergunta: 'Como criar uma nova parcela?',
                resposta: 'Para criar uma nova parcela, basta clicar no botão azul com o símbolo de adição que fica no fim da tela. Aparecerá uma mensagem pedindo para informar o nome da nova parcela e este nome não pode ser igual ao das parcelas já existentes neste ano do monitoramento.',
                fonte: ''
            },
            {
                pergunta: 'Cuidados ao criar uma nova parcela',
                resposta: 'O nome da parcela é a principal referência para criar um bom histórico do seu monitoramento, portanto certifique-se de sempre usar os mesmos nomes de parcela ao longo dos anos. As parcelas criadas automaticamente pelo aplicativo são padronizadas, porém caso você opte por criar novas parcelas é recomendado que tome bastante cuidado para gerir suas informações!',
                fonte: ''
            },
            {
                pergunta: 'Posso excluir uma parcela?',
                resposta: 'Sim! Você é livre para usar o aplicativo da maneira que preferir e como irá gerir suas informações. Mas caso você não tenha domínio sobre a ferramenta (aplicativo) e o protocolo do monitoramento, recomendamos que sempre siga as instruções e utilize o aplicativo da maneira recomendada para evitar erros.',
                fonte: ''
            },
        ],
        parcelaFormulario: [
            {
                pergunta: 'Cobertura de vegetação',
                resposta: 'Para cobertura de vegetação são 26 pontos (P) por parcela.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Cobertura de copas',
                resposta: 'vegetação nativa ou exótica com altura superior a 2 metros.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Amostragem (Savânica e campestre)',
                resposta: 'A cobertura do solo é amostrada pelo método de interceptação de pontos em linha. Neste método, ao longo da linha central (de 25 cm) da parcela, deverá ser amostrado um ponto a cada metro. O primeiro ponto deve ser exatamente no início da linha central (metro zero). O segundo ponto deverá ser a um metro do início da linha central, e assim por diante, totalizando 26 pontos de coleta. Em cada ponto de coleta, coloque a vareta perpendicular ao solo. Observe se há qualquer cobertura de vegetação acima do solo nesse ponto. Se não houver cobertura, selecione “ausente”. Se houver cobertura por uma ou mais plantas, selecione o(s) tipos(s):”lenhosa nativa”, “exótica perene ou ciclo longo”, gramínea nativa”, “gramínea exótica”. Em seguida, pressione continuar.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Amostragem (Florestal)',
                resposta: 'cobertura da vegetação é amostrada pelo método de interceptação de pontos em linha. Neste método, ao longo da linha central (de 25 cm) da parcela, deverá ser amostrado um ponto a cada metro. O primeiro ponto deve ser exatamente no início da linha central (metro zero). O segundo ponto deverá ser a um metro do início da linha central, e assim por diante, totalizando 26 pontos de coleta. Em cada ponto de coleta, coloque a vareta de 2 m perpendicular ao solo. Imagine uma linha de projeção vertical acima da vareta. Olhe para cima. Caso não observe nenhuma copa, selecione “ausente”. Caso observe uma ou mais copas de árvores ao longo da linha de projeção, selecione “nativa” e/ou “exótica perene ou ciclo longo”. Em seguida, pressione continuar.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Nativas',
                resposta: 'Espécies nativas do bioma Cerrado.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Lenhosa nativa',
                resposta: 'Árvores e arbustos perenes de espécies nativas do bioma.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Densidade de indivíduos',
                resposta: 'Para densidade são 25 quadrantes (Q) de 4m x 1m por parcela.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Regenerantes nativos (em formações savânicas)',
                resposta: 'Indivíduos lenhosos (árvores e arbustos perenes) de espécies nativas do bioma Cerrado com altura superior a 30 cm.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Regenerantes nativos (formações florestais)',
                resposta: 'Indivíduos lenhosos (árvores e arbustos perenes) de espécies nativas do bioma Cerrado com altura entre 30 cm e 2 m.',
                fonte: '',
                img: '',
            }
        ],
        catalogoEspecies: [
            {
                pergunta: 'Para que serve o catálogo de espécies?',
                resposta: 'O catálogo é um facilitador durante o preenchimento de informações da parcela. Você pode cadastrar quais espécies existem no seu imóvel préviamente para utilizar estes nomes quando necessário! Isso garante uma maior uniformidade nos seus preenchimentos reduzindo o risco de erros de digitação.',
                fonte: '',
                img: '',
            }
        ],
        minhasLocalidades: [
            {
                pergunta: 'Para que serve essa funcionalidade de Mapas salvos?',
                resposta: 'Sabemos que durante o trabalho de coleta em campo é possível não ter nenhuma internet próxima e isso compromete o uso do GPS em alguns dispositivos. Portanto para que se possa preencher os campos relativos a localização e/ou mapas durante o uso do aplicativo OFFLINE é necessário cadastrar préviamente estes pontos.',
                fonte: '',
                img: '',
            },
            {
                pergunta: 'Como posso cadastrar uma localização para usar offline?',
                resposta: 'Basta clicar no botão de adicionar, localizado no canto inferior da tela. Logo em seguida irá abrir um mapa onde você deverar explorá-lo até encontrar a localidade que deseja salvar. Após isso basta marcar um ponto no mapa e apertar o botão de confirmar. Neste momento você irá inserir o nome dessa localização e após a confirmação ela estará salva para que seja possível usar esse mapa offline! (É preciso conexão com a internet para que seja possível utilizar esta funcionalidade).',
                fonte: '',
                img: '',
            }
        ]
    };
}
