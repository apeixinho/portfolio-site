FROM node:lts-alpine

# Setup environment variables.
# If using one liner breakpoint '\' you can't use previously defined
# variables in posterior variables. Just define ENV per line
ENV NODE_ENV=production
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH=${PATH}:${NPM_CONFIG_PREFIX}/bin

# Following best practices at:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md


RUN apk update && apk upgrade && \
  # apk add --no-cache build-base git && \
  apk add --no-cache git && \
  rm -f /var/cache/apk/*

# ENV PATH=${PATH}:"$(yarn global bin)"

# https://www.alpinelinux.org/posts/Docker-image-vulnerability-CVE-2019-5021.html
# https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-5021
# make sure root login is disabled
RUN sed -i -e 's/^root::/root:!:/' /etc/shadow

# add a group and user for our app, for a system user or group
# add '-S' to addgroup or adduser commands
RUN addgroup -S app && adduser -S -g app app

COPY . /home/app/website

RUN chown -R app:app /home/app

USER app

WORKDIR /home/app/website

RUN npm i && npm run build:prod

EXPOSE 10001

# CMD ["node_modules/pm2/bin/pm2-docker", "start", "pm2-conf.json"]
CMD ["node_modules/pm2/bin/pm2-runtime", "start", "pm2-conf.json"]
# CMD ["tail","-f", "/dev/null"]
