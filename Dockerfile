FROM node:8.1.2
MAINTAINER David Inga <david.inga@vizzuality.com>

# Create app directory
WORKDIR /usr/src/app

ENV WRI_API_URL https://api.resourcewatch.org/v1
ENV BACKOFFICE_API_URL https://staging.prepdata.org/api
ENV APPLICATIONS prep
ENV CONTROL_TOWER_URL https://production-api.globalforestwatch.org
ENV CALLBACK_URL https://staging.prepdata.org/admin/auth
ENV BASEMAP_TILE_URL http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
ENV NODE_ENV production

# Install dependencies
RUN apt-get update && \
      apt-get install -y bash git build-essential \
      automake autoconf make g++ libtool libcairo2-dev \
    && npm install -g node-gyp --loglevel warn \
    && mkdir -p /usr/src/app && mkdir -p /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn install

# Bundle app source
COPY . /usr/src/app
RUN yarn run build
CMD ["yarn", "start"]
