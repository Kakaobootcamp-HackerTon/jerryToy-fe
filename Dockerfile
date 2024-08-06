FROM krmp-d2hub-idock.9rum.cc/goorm/node:20.16.0

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM krmp-d2hub-idock.9rum.cc/goorm/node:20.16.0

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]