FROM node
COPY package*.json ./
RUN npm install
ADD . .
CMD npm start
