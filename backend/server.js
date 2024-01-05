// backend/server.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Proxy middleware
app.use('/ors', createProxyMiddleware({
  target: 'https://api.openrouteservice.org',
  changeOrigin: true,
  pathRewrite: {
    '^/ors': '',
  },
}));

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
