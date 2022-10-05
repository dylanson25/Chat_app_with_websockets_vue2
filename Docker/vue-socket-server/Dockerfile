FROM node:16.14.0

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

# docker build  -t sockets-chatApp .
# docker images
# docker run -it -p 8081:8081 sockets-chatApp
