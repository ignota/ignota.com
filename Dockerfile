# ------------------------------ BUILD CONTAINER -------------------------------
FROM 474766710609.dkr.ecr.us-east-2.amazonaws.com/jutta:latest AS webpack

WORKDIR /usr/src/ignota.com

COPY package.json yarn.lock /usr/src/ignota.com/

RUN yarn

COPY . /usr/src/ignota.com

RUN . secrets/aws.sh && yarn build:production

# ----------------------------- RUNTIME CONTAINER ------------------------------
FROM 474766710609.dkr.ecr.us-east-2.amazonaws.com/jutta:latest

WORKDIR /usr/lib/ignota.com

COPY --from=webpack /usr/src/ignota.com/dist /usr/lib/ignota.com/

COPY package.json yarn.lock /usr/lib/ignota.com/

RUN yarn install --production --cache-folder=/tmp/yarn-cache \
  && rm -rf /tmp/yarn-cache

COPY config/nginx/nginx.production.conf /etc/nginx/sites-enabled/ignota.conf

RUN chown -R www-data:www-data /usr/lib/ignota.com

EXPOSE 80
