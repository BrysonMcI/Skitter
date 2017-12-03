FROM node

RUN mkdir /src

WORKDIR /src

COPY js/package.json .
RUN npm install --quiet

COPY js/ .
