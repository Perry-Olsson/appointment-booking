# stage 1
FROM node 
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run generate
COPY ./.env-docker ./.env
RUN npm run tsc


EXPOSE 3001

CMD npm start