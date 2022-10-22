FROM node

WORKDIR /app/services/fault-service-mangement

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8002

CMD ["npm", "start"]