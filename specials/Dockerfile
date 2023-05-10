FROM node

WORKDIR /app/specials

COPY package.json .

RUN npm install

COPY . .

EXPOSE 6009

CMD ["npm", "start"]