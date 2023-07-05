FROM node

RUN mkdir unit
WORKDIR /unit

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]
