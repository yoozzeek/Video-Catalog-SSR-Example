FROM node:12.15.0

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN yarn
COPY ./ /usr/src/app/
RUN yarn build
CMD ["yarn", "start"]

