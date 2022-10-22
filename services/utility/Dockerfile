FROM node

WORKDIR /app/services/utility

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]