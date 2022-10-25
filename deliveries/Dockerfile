FROM node:16

WORKDIR /app/services/deliveries

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8007

CMD ["npm", "start"]