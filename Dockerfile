FROM node:14

COPY package*.json ./

RUN npm install
COPY tsconfig.json ./tsconfig.json

COPY src ./src

RUN npm run build

EXPOSE 8080
CMD npm run start