### STAGE 1: Build ###

# We label our stage as �builder�
FROM node:8.1.4-alpine as builder

COPY ./SkitterFrontend/package.json ./SkitterFrontend/package-lock.json ./

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /SkitterFrontend && cp -R ./node_modules /SkitterFrontend

WORKDIR /SkitterFrontend

COPY ./SkitterFrontend /SkitterFrontend

## Build the angular app in production mode and store the artifacts in dist folder
RUN $(npm bin)/ng build --prod

### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From �builder� stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /SkitterFrontend/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]