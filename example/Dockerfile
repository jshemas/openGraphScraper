# docker build -t open-graph-scraper .
# docker run -dp 127.0.0.1:3000:3000 open-graph-scraper
# http://127.0.0.1:3000/scraper?url=http://ogp.me/
FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
