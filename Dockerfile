FROM nginx:stable-alpine

EXPOSE 80 443

ENV NODE_ENV production

RUN apk update\
  && apk add nodejs
  
COPY . /srv

WORKDIR /srv

RUN npm i\
  && npm run build\
  && mv /srv/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
