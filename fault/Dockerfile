FROM node:16

WORKDIR /app/fault

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]