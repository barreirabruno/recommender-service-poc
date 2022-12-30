# Primeiro passo - instalar dependências
FROM node:16.19-alpine
WORKDIR /usr/src/app
COPY package*.json /build/
WORKDIR /build
RUN npm install

# Segundo passo - compilar o Typescript
FROM node:16.19-alpine
RUN mkdir /compile
COPY --from=0 /build /compile
WORKDIR /compile
COPY . .
# Uso do comando de build aqui
RUN npm run build

# Terceiro passo - instalar apenas a dependências de produção
FROM node:16.19-alpine
COPY package*.json /build/
WORKDIR /build
RUN npm set-script prepare ''
RUN npm install --omit=dev

# Por fim rodar a aplicação
FROM node:16.19-alpine
WORKDIR /app
# copie artefatos compilados no passo 1
COPY --from=1 --chown=node:node /compile/dist /app/dist
# copie dependencias de producao do passo 2
COPY --from=2 --chown=node:node /build /app/dist
USER node
EXPOSE 8080
CMD [ "node", "dist/main/index.js" ]
