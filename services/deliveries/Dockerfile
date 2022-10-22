FROM node

WORKDIR /app/services/deliveries

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8007

CMD ["npm", "start"]