FROM node:alpine AS base
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS development
ENV NODE_ENV development
EXPOSE 3000
CMD ["npm", "run", "dev:client"]

FROM base AS builder
WORKDIR /usr/app
COPY . .
COPY --from=development /usr/app/node_modules ./node_modules
RUN npm run build && npm install --production

FROM node:alpine
WORKDIR /usr/app
ENV NODE_ENV production
RUN npm install --global pm2

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /usr/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/app/.next ./.next
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["pm2-runtime", "npm", "--", "start"]
