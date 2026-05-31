#!/usr/bin/env node

const http = require('http');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const createGracefulShutdownMiddleware = require('express-graceful-shutdown');

const app = express();
const rawPort = Number.parseInt(process.env.PORT, 10);
const port =
  Number.isFinite(rawPort) && rawPort > 0 ? rawPort : 10001;

app.use(
  helmet({
    hsts: false,
  }),
);

app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const server = http.createServer(app);
app.use(createGracefulShutdownMiddleware(server, { forceTimeout: 30000 }));

server.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('Listen error', err);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log('App listening on port', port);
});
