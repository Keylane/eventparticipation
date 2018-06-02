var mongoose;

const envUtil = require('../utils/environmentUtils');

async function connectDb(config) {
  mongoose.connection.on('connected', function() {
    console.log("Connected to db '" + config.uri + "'");
  });
  mongoose.connection.on('error', function(err) {
    console.log("Could not connect to DB '" + config.uri + "': " + err);
  });
  return await mongoose.connect(config.uri);
}

async function connectOnServerStart(config, app) {
	if (config.dbType === "mongodb") {
		mongoose = require('mongoose');
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', function() {
			app.listen(config.port, () => {
				console.log("Server running on port " + config.port);
			});
		});
		await connectDb(config);
	} else {
		app.listen(config.port, () => {
			console.log("Server running on port " + config.port);
		});
	}
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  connectDb,
  disconnect,
  connectOnServerStart
}
