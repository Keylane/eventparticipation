const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
//const mongoose = require('mongoose');
const connectionManager = require("./server/logics/connectionManager");
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
process.env.NODE_ENV = require('./server/utils/environmentUtils').ENV.DEV; // Control environment (DEV, TEST, PROD)
// Initialize the application
const app = express();


app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:3000'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/client/dist/client'));
app.use(require('./server/routes/routes'));

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
// });

const config = require('./server/config/config').getConfig();
console.log("Using config for " + config.env);
connectionManager.connectOnServerStart(config, app);
