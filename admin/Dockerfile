FROM node:latest AS base

WORKDIR  /app

COPY package.json package-lock.json ./

ENV PATH /app/node_modules/.bin:$PATH


COPY . .

# RUN  npx prisma generate

ENV PORT=8000
EXPOSE $PORT

FROM base AS development
ENV NODE_ENV=development
CMD [ "sh","-c", "npm prisma migrate deploy && npm run start:dev" ]