FROM node:8.7.0

WORKDIR /usr/src/app/

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000
CMD [ "yarn", "run", "start" ]