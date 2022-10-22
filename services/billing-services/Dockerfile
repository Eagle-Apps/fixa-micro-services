FROM node

WORKDIR /app/services/billing-services

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8005

CMD ["npm", "start"]