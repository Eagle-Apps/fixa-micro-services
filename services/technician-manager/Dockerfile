FROM node

WORKDIR /app/services/technician-management

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8004

CMD ["npm", "start"]