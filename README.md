# Serviço de recomendação - prova de conceito

## Descrição
Atende a prova de conceito do projeto aplicado do MBA em arquitetura de software - XP Educação.</br>
Recomenda um incentivador para o usuário baseado na área de projetos no qual determinado incentivador realiza aportes, reduz o tempo que o usuário de pesquisa do usuário por um incentivador.

## Funcionalidades disponíveis
- Recomendação por área de projetos incentivados por cada incentivador disponível
- Listar todos incentivadores disponíveis
- Pesquisar um incentivador específico pelo id

## Construído com
- Typescript
- NodeJS
- Jest
- Express
- natural
- vector-object

## Setup do projeto

1. Instale as depedências do projeto
```
npm install
```

2. Faça o build do projeto
```
npm run build
```

3. Inicie o projeto
```
npm start
```

### Run unit tests

```
npm run test
```

## Requisições e utilitários

**Incentivadores disponíveis:**<br/>
Lista informações de incentivadores disponíveis na base de dados treinada para a recomendação. Os ids retornados são utilizados para consulta posterior no portal SALIC, com ele é possível obter mais informações sobre o incentivador.

Requisição:
```
curl --location --request GET 'http://localhost:3334/sponsor'
```

**Incentivadores por id:**<br/>
Dado um id de incentivador, busca informações no portal SALIC e retorna. Consulte a requisição de incentivadores disponíveis para ver um id de incentivador válido, caso um id de incentivador seja inválido, isto é, não existe nos dados treinados, a busca de incentivador por id não funcionará.

Requisição:
```
curl --location --request GET 'http://localhost:3333/sponsor/single?sponsor_id=<ID_DE_INCENTIVADOR>'
```

**Recomendação de incentivador:**<br/>
Dado um id de incentivador, retorna uma lista de incentivadores similares. Consulte a requisição de incentivadores disponíveis para ver um id de incentivador válido, caso um id de incentivador seja inválido, isto é, não existe nos dados treinados, a recomendação não funcionará.

Requisição:
```
curl --location --request GET 'http://localhost:3333/sponsor/recommender?sponsor_id=<ID_DE_INCENTIVADOR>
```

## Diagrama de design de código

Mostra como o código foi pensado e executado para o serviço de recomendação - **Veja a explicação deste diagrama abaixo**:
![alt text for screen readers](/docs/img/diagrams/code-design-diagram.png "Diagrama de design de código")

- **Domain**
  - Camada mais interna da aplicação
  - Não depende de nenhuma outra camada
  - Define a(s) entidade do sistema:
    - ProcessedSponsorDocument
  - Define o(s) contrato(s) de caso de uso/funcionalidade(s) do sistema:
    - available-sponsor
    - recommender-service
    - sponsor-by-id
    - cosine-similarity-calculator-service
    - document-to-vector

- **Data**
  - Depende da camada Domain
  - Implementa caso(s) de uso/funcionalidade(s) da camada Domain
  - Available-sponsor-service
    - Utiliza um http-client da camada de Infra
  - Document-to-vector-transformer-service
    - Utiliza a biblioteca Vector-object da camada de infra
    - Utiliza a biblioteca Natural da camada de infra

- **Infra**
  - Provê ferramentas (como uso de bibliotecas externas) para a camada Data e Application
  - Implementa bibliotecas externas:
    - http
      - Axios - http client
      - Express - http server
    - logger
      - Pino
    - natural
    - vector-object
    - _prepared_data
      - Documento JSON com dados de incentivadores retirados do portal SALIC para que a recomendação seja calculada e executada, pode ser melhorado posteriormente passando os dados para um banco de dados e implementando um repositório de acesso a dados

- **Application**
  - Depende da camada Data
  - Implementa a classe abstrata Controller
    - Controller tem o método perform, que será implementado por Controllers específicos
  - Controllers implementados extendendo de Controller:
    - available-sponsor-controller
    - recommender-controller
    - sponsor-by-id-controller

- **Main**
  - Depende das camadas Application, Infra, Data e Domain
  - Cria todas as instâncias necessárias e atende a injeção de dependência que cada classe aprenseta, por exemplo, application services da camada Data devem ser injetados nos Controllers da camada Application
  - Rotas HTTP utilizam do web server Express e demais instâncias criadas de Controllers