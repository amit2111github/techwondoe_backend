FROM node:12
WORKDIR /home/node/app1
COPY . /home/node/app1
RUN apt update && npm install && apt install -y vim iputils-ping
CMD npm run start