const envUtil = require('../utils/environmentUtils');

function getConfig() {
	if (envUtil.isRunningProd()) {
		return {
			env: 'PROD',
			uri: 'mongodb://localhost:27017/eventparticipation_prod',
			dbName: 'eventparticipation_prod',
			dbType: 'stub',
			port: 3000
		};
	} else if (envUtil.isRunningTest()) {
		return  {
			env: 'TEST',
			uri: 'mongodb://localhost:27017/eventparticipation_test',
			dbName: 'eventparticipation_test',
			dbType: 'stub',
			port: 3000
		};
	}
	return  {
		env: 'DEV',
		uri: 'mongodb://localhost:27017/eventparticipation_dev',
		dbName: 'eventparticipation_dev',
		dbType: 'stub',
		port: 3000
	};
}

module.exports = {
	getConfig
}
