Instalar pacotes:
yarn install

Run dev:
yarn dev

Porta node: 3058

Nome da base de dados no mongo: 
    radisCerradoDev (Para ambiente de desenvolvimento)
    (definido no arquivo app.ts)

Para rotas que necessitem de autenticação do usuário criamos a Middleware de autenticação (auth.ts) para validar o token enviado pela requisitação, o server deve receber a requisição no formato Bearer ${token} e com isso poderá ser acessado dentro do método o campo req.user que irá conter o nome do usuário autenticado que realizou a requisição.
Para isso precisar alterar manualmente o arquivo:

                    node_modules/@types/express/index.d.ts

E incluir a declaração a seguir depois dos imports:
declare global{
    namespace Express {
        interface Request {
            user: string,
            token: string
        }
    }
}

Na posta Mock encontra-se o exemplo de como está sendo salvo os esquemas dos imóveis e dos usuários.
Última atualização dos mocks:

Imovel: 02/08/21
User: 02/08/21

Link para dicionário de dados: 
