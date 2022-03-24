FROM node:16 AS build
WORKDIR /app
COPY . /app
RUN npm install && npm run build


FROM nginx

RUN echo '\
server {\n\
  listen 80;\n\
  root /app/kiddymap;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri$args $uri$args/ /index.html =404;\n\
  }\n\
}'\
> /etc/nginx/conf.d/default.conf


COPY --from=build /app/dist/kiddymap /app/kiddymap