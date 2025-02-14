FROM node:lts-alpine

RUN adduser -D products-api

ARG PORT_SERVER=8080
ENV PORT $PORT_SERVER

ARG API_PORT=8080
ENV API_PORT=${API_PORT}

EXPOSE $PORT

RUN mkdir -p /usr/src/app

RUN chown -R products-api /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --ignore-scripts -g nodemon && npm install --ignore-scripts

# COPY --chown=products-api . .

COPY --chown=products-api ./src ./src
COPY --chown=products-api tsconfig.json ./
COPY --chown=products-api .sequelizerc ./
COPY --chown=products-api nodemon.json ./
COPY --chown=products-api package*.json ./
COPY --chown=products-api mocharc.json ./

RUN chmod -R 755 /usr/src/app

RUN npm run build

USER products-api

CMD [ "node", "build/index.js" ]
