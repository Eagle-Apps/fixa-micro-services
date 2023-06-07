FROM node

WORKDIR /app/subscriptions

COPY package.json .

RUN npm install

COPY . .

EXPOSE 7001

CMD ["npm", "start"]