FROM node:16

RUN mkdir deliveries
WORKDIR /deliveries

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8007

CMD ["npm", "start"]
