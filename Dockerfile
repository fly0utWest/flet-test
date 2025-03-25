FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM joseluisq/static-web-server:latest

COPY --from=build /app/build /public

EXPOSE 8080

CMD ["static-web-server"]
