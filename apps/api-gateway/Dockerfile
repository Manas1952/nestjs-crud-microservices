# apps/api-gateway/Dockerfile

FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build api-gateway

CMD ["node", "dist/apps/api-gateway/main"]
