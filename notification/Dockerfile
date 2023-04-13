FROM node:16
RUN mkdir notification
WORKDIR /notification

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8006

CMD ["npm", "start"]
