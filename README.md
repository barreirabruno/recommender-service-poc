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

**Recomendação de incentivador:**<br/>
Dado um id de incentivador, retorna uma lista de incentivadores similares. Consulte a requisição de incentivadores disponíveis para ver um id de incentivador válido, caso um id de incentivador seja inválido, isto é, não existe nos dados treinados, a recomendação não funcionará.

Requisição:
```
curl --location --request GET 'http://localhost:3333/sponsor/recommender?sponsor_id=<ID_DE_INCENTIVADOR>
```

## Diagrama de design de código

Mostra como o código foi pensado e executado para o serviço de recomendação:
![alt text for screen readers](/docs/img/diagrams/code-design-diagram.png "Diagrama de design de código")