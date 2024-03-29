# Conversor de moedas

Voc� dever� implementar uma API Rest que seja capaz de realizar a convers�o entre duas moedas
utilizando taxas de convers�es atualizadas de um servi�o externo.

Para realiza��o da convers�o � necess�rio o ID do usu�rio que deseja realizar a convers�o.

A API dever� registrar cada transa��o de convers�o com todas as informa��es relacionadas e tamb�m
disponibilizar um endpoint para consulta das transa��es realizadas por um usu�rio.

O projeto dever� ser feito em Node.js com TypeScript.

1. Deve ser poss�vel realizar a convers�o entre 4 moedas no m�nimo (BRL, USD, EUR, JPY);
1. As taxas de convers�o devem ser obtidas de [https://api.exchangeratesapi.io/latest?base=USD];
1. As transa��es de convers�o devem ser persistidas no banco de dados (embedded) contendo:
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Uma transa��o com sucesso deve retornar:
    * ID da transa��o
    * ID do usu�rio;
    * Moeda origem;
    * Valor origem;
    * Moeda destino;
    * Valor destino;
    * Taxa de convers�o utilizada;
    * Data/Hora UTC;
1. Uma transa��o com falha conhecida deve retornar um erro HTTP 400 com a descri��o da falha;
1. Dever� existir um endpoint para listagem de todas as transa��es realizadas por usu�rio;
1. Deve haver uma cobertura satisfat�ria de testes;
1. Deve-se adicionar a esse arquivo explica��es sobre como rodar a aplica��o, e uma apresenta��o sobre o
projeto: prop�sito, features, motiva��o das principais escolhas de tecnologias, e separa��o das camadas;
1. Todo o c�digo deve ser em ingl�s;
1. Disponibilizar o c�digo apenas nesse reposit�rio, sem nenhuma c�pia p�blica, para evitar pl�gio;

## Itens desej�veis
* Logs
* Tratamento de exce��es
* Documenta��o
* Coes�o de commits
* Mensagens de commits claras
* Configura��o de lint
* Testes unit�rios
* Testes de integra��o
* Documenta��o dos endpoints
* Estar rodando e dispon�vel (Ex: Heroku, ou similar)
* CI/CD


-------------------------------------------------------------------------------------------------

# CONFIGURAÇÃO INICIAL DO AMBIENTE DE DESENVOLVIMENTO

1) copiar e colar o .env.local
2) renomear para .env

# COMANDO PARA INSTALAR E RODAR O AMBIENTE DE DESENVOLVIMENTO

npm install
npm run dev

# COMANDOS UTEIS 

  npm run start                                --> executar o servidor no build (/dist)
  npm run dev                                  --> executar o servidor de desenvolvimento 
  npm run build                                --> cria o build da aplicação (/dist)  
  npm run lint:fix                             --> verifica erros de sintaxe
  npm run test                                 --> executa todos os testes uma unica vez 
  npm run test:watch                           --> executa e mantem os testes unitarios em execução
  npm run test:integration                     --> executa testes de integração uma unica vez 
  npm run test:coverage                        --> executa os teste unitarios uma unica vez e gera o arquivo coverage
  npm run migration:create "nome da migration" --> cria uma migration
  npm run migrate                              --> executa as migrations
  npm run migrate:revert                       --> reverte a ultima migration

# SOBRE A APLICAÇÃO

## FEATURES

  * CRUD de usuários
  * Listar, mostrar e deletar transações
  * Realizar conversões entre modemas
## TECNOLOGIAS UTILIZADAS

  * TYPEORM - ORM que eu tenho mais familiaridade por trabalhar com ele todo dia
  * SQLITE - É o único banco de dados embedded que o TYPEORM suporta
  * JEST - É a lib mais fácil para realizar testes no JS

## CAMADAS
  Busquei por seguir o padrão clean architecture e respeitar os princípios SOLID

  * INFRA: Camada que faz as implementações mais externas à API
  * DOMAIN: Camada que guarda as regras de negócio da aplicação
  * APPLICATION: Camada que acessa usa a domain para repassar features para os usuários da API
  * MAIN: Camada que configura a API, define os ENDPOINTS e cria os adaptadores da aplicação.
