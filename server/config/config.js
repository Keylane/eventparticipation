const envUtil = require('../utils/environmentUtils');

function getConfig() {
	if (envUtil.isRunningProd()) {
		return {
			env: 'PROD',
			uri: 'mongodb://localhost:27017/eventparticipation_prod',
			dbName: 'eventparticipation_prod',
			port: 3000
		};
	} else if (envUtil.isRunningTest()) {
		return  {
			env: 'TEST',
			uri: 'mongodb://localhost:27017/eventparticipation_test',
			dbName: 'eventparticipation_test',
			port: 3000
		};
	}
	return  {
		env: 'DEV',
		uri: 'mongodb://localhost:27017/eventparticipation_dev',
		dbName: 'eventparticipation_dev',
		port: 3000
	};
}

module.exports = {
	getConfig
}
