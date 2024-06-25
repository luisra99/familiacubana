ARG DOCKER_HUB_REGISTRY
#ARG ARTIFACT_REGISTRY

# This file is a template, and might need editing before it works on your project.
FROM $DOCKER_HUB_REGISTRY/node:lts-alpine AS builder
#FROM $ARTIFACT_REGISTRY/amd64/node:20.11.1 AS builder

#config for npm registry
ARG NPM_REGISTRY
RUN npm config set registry $NPM_REGISTRY
RUN npm config set strict-ssl false

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app
COPY package.json .
COPY . .

# ARG instructions
ARG NODE_ENV
ARG NODE_VERSION
ARG YARN_VERSION
ARG PORT
ARG ENV_SERVER_URL
ARG ENV_URL
ARG ENV_MODE

# ENV instructions
ENV NODE_ENV=$NODE_ENV
ENV NODE_VERSION=$NODE_VERSION
ENV YARN_VERSION=$YARN_VERSION
ENV PORT=$PORT
ENV ENV_SERVER_URL=$ENV_SERVER_URL
ENV ENV_URL=$ENV_URL
ENV ENV_MODE=$ENV_MODE

#Install dependencies
RUN npm install

#Build and optimize version
ENV NODE_ENV production
RUN npm run build


FROM $DOCKER_HUB_REGISTRY/node:lts-alpine AS runner
#FROM $ARTIFACT_REGISTRY/amd64/node:20.11.1 AS runner

#config for npm registry
ARG NPM_REGISTRY
RUN npm config set registry $NPM_REGISTRY
RUN npm config set strict-ssl false

RUN npm install serve -g

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080
ENV PORT 8080

CMD [ "serve", "-s", "dist", "-l", "8080" ]
