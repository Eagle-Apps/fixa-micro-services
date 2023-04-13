FROM node:16
RUN mkdir technician

WORKDIR /technician

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD ["npm", "start"]
