FROM node:alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

#RUN apt-get update && apt-get install -y build-essential python-dev

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]