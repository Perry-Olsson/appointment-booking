# stage 1
FROM node as builder
WORKDIR /usr/app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npm run generate
RUN npm run tsc

FROM node

WORKDIR /usr/app
COPY ./package*.json .
RUN npm install --production
COPY --from=builder /usr/app/dist ./dist
COPY ./src/prisma ./src/prisma
COPY ./.env .
RUN npm run generate

EXPOSE 3001

CMD npm start