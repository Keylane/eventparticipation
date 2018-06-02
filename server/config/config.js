const envUtil = require('../utils/environmentUtils');

function getConfig() {
	if (envUtil.isRunningProd()) {
		return {
			env: 'production',
			uri: 'mongodb://localhost:27017/eventparticipation_prod',
			dbName: 'eventparticipation_prod',
			dbType: 'mongodb', // change to 'mongodb' to get it to work with mongo
			port: process.env.PORT || 3000
		};
	} else if (envUtil.isRunningTest()) {
		return  {
			env: 'test',
			uri: 'mongodb://localhost:27017/eventparticipation_test',
			dbName: 'eventparticipation_test',
			dbType: 'stub',
			port: process.env.PORT || 3000
		};
	}
	return  {
		env: 'development',
		uri: 'mongodb://localhost:27017/eventparticipation_dev',
		dbName: 'eventparticipation_dev',
		dbType: 'stub',
		port: process.env.PORT || 3000
	};
}

module.exports = {
	getConfig
}
