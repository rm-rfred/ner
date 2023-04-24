FROM node:18.12.1

ENV GENERATE_SOURCEMAP=false 

WORKDIR /app

COPY ./app/package.json /app/package.json
COPY ./app/tsconfig.json /app/tsconfig.json

RUN npm install --legacy-peer-deps
RUN npm install --verbose -g serve@11.3.1

ARG CHOKIDAR_USEPOLLING
ARG NODE_ENV

COPY ./app/src /app/src
COPY ./app/public /app/public