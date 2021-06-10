# stage 1
FROM node:14 as development
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run tsc

ENV NODE_ENV development
ENV DATABASE_URL postgres://postgres:secret@db/appointments

EXPOSE 3001

CMD npm run dev:js

FROM node:alpine

WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --production
COPY --from=development /usr/app/dist ./dist
COPY ./src/prisma ./src/prisma
COPY ./.env .
RUN npx prisma generate

ENV NODE_ENV production

EXPOSE 3001

CMD npm start