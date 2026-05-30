# My Portfolio Website

This site is set up to run on [nginx proxy automation](https://github.com/evertramos/nginx-proxy-automation).

All _nginx_, _Let's Encrypt_ _proxy automation_ credit goes to [these folks](https://github.com/evertramos/nginx-proxy-automation).

## Build and CV

- Install dependencies: `npm ci` (uses `package-lock.json` for reproducible installs).
- Place your CV at **`src/docs/apeixinhoCV.pdf`**. Webpack copies it to **`dist/apeixinhoCV.pdf`** for the download link; **`npm run build`** / **`npm run build:prod`** fail if that file is missing (by design).

## How to run with _Docker_

Build the image (tag must match the image name in `docker run` below):

```bash
docker build -t portfolio-site .
```

The container serves the built site with `node server.js` on port **10001** (no PM2 inside the image).

- To run _Docker_ with _Let's Encrypt_ for **Production Environment** execute the following command:

```bash
docker run -d \
    -e VIRTUAL_HOST=your-domain.org \
    -e LETSENCRYPT_HOST=your-domain.org \
    -e LETSENCRYPT_EMAIL=name@domain.org \
    --expose=10001 \
    --restart=on-failure:10 \
    --network=webproxy \
    --name portfolio-site \
    portfolio-site
```

- To run _Docker_ with _Let's Encrypt_ for **Test Environment** execute the following command:

```bash
docker run -d \
    -e VIRTUAL_HOST=your-domain.org \
    -e LETSENCRYPT_HOST=your-domain.org \
    -e LETSENCRYPT_EMAIL=name@domain.org \
    -e LETSENCRYPT_TEST="true" \
    --expose=10001 \
    --restart=on-failure:10 \
    --network=webproxy \
    --name portfolio-site \
    portfolio-site
```

- To run _Docker_ without _Let's Encrypt_ execute the following command:

```bash
docker run -d \
    --expose=10001 \
    --restart=on-failure:10 \
    --network=webproxy \
    --name portfolio-site \
    portfolio-site
```
