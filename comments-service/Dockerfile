FROM node:alpine
ENV NODE_PATH=./build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
