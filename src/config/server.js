const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initServer = () => {
    const app = express();
    app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
    app.use(cors());
    app.use(bodyParser.json());
    return app;
};
module.exports = initServer;