FROM node:14.18.2-alpine3.15
RUN addgroup react && adduser -S -G app react
USER app
COPY package*.json .
RUN npm install
COPY . .
ENV API_URL=http:localhost:3002
EXPOSE 3000
CMD npm start