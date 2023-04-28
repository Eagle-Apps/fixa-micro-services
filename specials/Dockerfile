FROM node:16

WORKDIR /app/specials

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6009

CMD ["npm", "start"]
