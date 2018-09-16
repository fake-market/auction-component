FROM node:10

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app

EXPOSE 3000

CMD ["node", "./server/index.js"]