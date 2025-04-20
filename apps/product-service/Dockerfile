# apps/product-service/Dockerfile

FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build product-service

CMD ["node", "dist/apps/product-service/main"]
