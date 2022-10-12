FROM node

WORKDIR /app/utility

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]