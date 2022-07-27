FROM node:12-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

ENV MONGO_URI=mongodb://mongo:27017/library
ENV JWT_SECRET_BCRYPT=ajdavndfsdnsnadkcianf

EXPOSE 5000

CMD ["npm", "start"]
