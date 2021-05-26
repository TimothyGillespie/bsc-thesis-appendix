FROM node:14 as build

RUN mkdir - /building

COPY ./ /building/

WORKDIR /building
RUN npm install
RUN npm run build

FROM nginx

COPY --from=build /building/dist/frontend /usr/share/nginx/html/

EXPOSE 80


