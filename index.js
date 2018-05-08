const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
//const mongoose = require('mongoose');
const connectionManager = require("./server/logics/connectionManager");
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
process.env.NODE_ENV = require('./server/utils/environmentUtils').ENV.DEV; // Control environment (DEV, TEST, PROD)
// Initialize the application
const app = express();

var whitelist = ['http://localhost:3000', 'http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client/dist/'));
app.use(require('./server/routes/routes'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

const config = require('./server/config/config').getConfig();
console.log("Using config for " + config.env);
connectionManager.connectOnServerStart(config, app);
