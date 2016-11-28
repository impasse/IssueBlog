FROM node:6

EXPOSE 80 443

COPY . /srv

WORKDIR /srv

RUN npm i \
  && npm run build

CMD ["npm","run","serve"]
