# stage 1
FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["ls", "-a", "."]

