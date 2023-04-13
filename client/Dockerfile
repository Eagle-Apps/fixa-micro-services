FROM node:16
RUN mkdir client
WORKDIR /client

COPY package*.json ./

COPY . .

EXPOSE 8001

CMD ["npm", "start"]
