# syntax=docker/dockerfile:1

# --- Build static assets (needs devDependencies: webpack, loaders, etc.)
FROM node:20-alpine AS builder

RUN apk add --no-cache git \
  && rm -f /var/cache/apk/*

WORKDIR /home/app/website

# Do not set NODE_ENV=production here — npm would skip devDependencies and break build:prod
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:prod


# --- Runtime: production deps + prebuilt dist only (no webpack toolchain)
FROM node:20-alpine

ENV NODE_ENV=production

RUN apk upgrade --no-cache \
  && sed -i -e 's/^root::/root:!:/' /etc/shadow \
  && addgroup -S app && adduser -S -G app app \
  && rm -f /var/cache/apk/*

WORKDIR /home/app/website

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /home/app/website/dist ./dist
COPY server.js ./

RUN chown -R app:app /home/app/website

USER app

EXPOSE 10001

CMD ["node", "server.js"]
