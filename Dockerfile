FROM node:12.15.0

WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY ./ /usr/src/app/
CMD ["npm", "run", "dev"]
