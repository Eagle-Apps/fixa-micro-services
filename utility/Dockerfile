FROM node:16

RUN mkdir utility

WORKDIR /utility

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]
