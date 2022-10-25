FROM node:16

WORKDIR /app/billing

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]