FROM node:16

RUN mkdir service
WORKDIR /service

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6008

CMD ["npm", "start"]
