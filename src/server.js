'use strict';

// Dependencies:
import express from 'express';
import path from 'path';
import http from 'http';

// Commons variables:
const app = express();
const server = http.createServer(app);
const dir = (src) => path.resolve(__dirname, src);

// Settings:
app.set('env', (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "home") ? 'development' : process.env.NODE_ENV);
app.set('iface', '0.0.0.0');
app.set('port', 3000);
app.set('x-powered-by', false);

// Middlewares:
app.use('/app', express.static(dir('../dist/app')));
app.use('/entry', express.static(dir('../dist/bundles')));
app.get('*', (req, res) => res.sendFile(dir('./app/index.html')));

// Run:
server.listen(app.get('port'), app.get('iface'), () => {
  console.log(`Server running at http://${server.address().address}:${server.address().port} in ${app.get('env')} environment using ${server.address().family} family.`);
});
