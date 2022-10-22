FROM node

WORKDIR /app/services/notification-services

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8006

CMD ["npm", "start"]