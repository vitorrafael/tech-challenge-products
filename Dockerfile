# Usa uma imagem oficial do Node.js como base
FROM node:lts-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto
COPY . .

# Expõe a porta que o aplicativo vai rodar
EXPOSE 3000

RUN npm run build

CMD [ "node", "build/index.js" ]
