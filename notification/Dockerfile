FROM node:16

WORKDIR /app/notification

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8006

CMD ["npm", "start"]
