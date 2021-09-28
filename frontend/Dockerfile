FROM node:14.17.6-alpine as build
WORKDIR /frontend
COPY . .
RUN ["npm", "ci"]
RUN ["npm", "run", "build", "--prod"]

FROM nginx:alpine
COPY --from=build /frontend/dist/frontend /usr/share/nginx/html
EXPOSE 80
