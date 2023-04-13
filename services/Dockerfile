FROM node:16

RUN mkdir services
WORKDIR /services

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6008

CMD ["npm", "start"]
