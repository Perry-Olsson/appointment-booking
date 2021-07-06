# stage 1
FROM node:14 as base
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run tsc
ENV DATABASE_URL postgres://postgres:secret@db/appointments

FROM base as test

ENV NODE_ENV test
EXPOSE 3001

CMD ["/bin/bash"]

FROM base as development
ENV NODE_ENV development

EXPOSE 3001

CMD ["npm", "run", "dev:js"]

FROM node:alpine as db-manager
WORKDIR /usr/app
COPY ./db-manager.package.json ./package.json
COPY ./src/prisma ./src/prisma
COPY ./src/constants.ts ./src
COPY ./src/types.ts ./src
COPY ./tsconfig.json .
COPY ./.env .
COPY ./src/utils/cron/transferPastAppointments.ts ./src/utils/cron/transferPastAppointments.ts
RUN npm install
RUN npx prisma generate
CMD ["/bin/sh"]


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

CMD ["npm", "start"]