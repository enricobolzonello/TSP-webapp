FROM node:17-alpine as build
WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

RUN npm run build

FROM nginx:1.25.5 as production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
