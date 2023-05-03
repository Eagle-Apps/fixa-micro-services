FROM node:16

RUN mkdir fault
WORKDIR /fault

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]
