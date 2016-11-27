FROM nginx:stable

EXPOSE 80 443

RUN apt-get update \
  && apt-get -y install curl git \
  && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
  && apt-get update \
  && apt-get install -y nodejs

COPY . /srv

WORKDIR /srv

RUN npm i \
  && npm run build \
  && mv /srv/dist/* /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
