FROM node:16

WORKDIR /app/technician

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "start"]