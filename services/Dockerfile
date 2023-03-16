FROM node:16

WORKDIR /app/services

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8008

CMD ["npm", "start"]
