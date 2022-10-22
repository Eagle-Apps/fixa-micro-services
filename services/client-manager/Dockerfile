FROM node

WORKDIR /app/services/client-manager

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "start"]