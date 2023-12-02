FROM node:20.9.0 as build

WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

COPY ./src /app/src
COPY ./prisma /app/prisma

RUN yarn prisma generate
RUN yarn build

FROM node:20.9.0

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/yarn.lock /app/yarn.lock

COPY ./prisma /app/prisma

RUN yarn install --production

CMD ["yarn", "start"]

