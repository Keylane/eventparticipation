const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
//const mongoose = require('mongoose');
const connectionManager = require("./server/logics/connectionManager");
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const envUtil = require('./server/utils/environmentUtils');
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = envUtil.ENV.DEV
}
// Initialize the application
const app = express();

app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:8080'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(require('./server/routes/routes'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

console.log("Environment set to " + process.env.NODE_ENV);
const config = require('./server/config/config').getConfig();
console.log("Using config for " + config.env);
connectionManager.connectOnServerStart(config, app);
