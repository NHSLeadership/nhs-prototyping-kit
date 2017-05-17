FROM node

ADD . /app
RUN chown -R node:node /app

USER node
WORKDIR /app

EXPOSE 3000:3000

CMD npm install && npm rebuild node-sass &&  npm start
