FROM node:6

EXPOSE 80 443

WORKDIR /srv

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

CMD ["npm","run","serve"]
