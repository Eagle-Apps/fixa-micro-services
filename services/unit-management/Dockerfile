FROM node

WORKDIR /app/services/unit-management

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]