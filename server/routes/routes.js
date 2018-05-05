var express = require('express');
var router = express.Router({ mergeParams: true });

//router.use(function(req,res,next){req.TaxApp = {};next()});
//router.use('/authentication', require('./authenticationRoutes'));

//router.use(require('./middleware').authenticate);

router.use('/event', require('./eventRoutes'));
//router.use('/taxyear', require('./taxyearRoutes'));
//router.use('/usertaxyear', require('./userTaxyearRoutes'));
//router.use('/employer', require('./employerRoutes'));
//router.use('/employerIncome', require('./employerIncomeRoutes'));
// Error handling routes - should always be last!
//const errorRoutes = require('./errorRoutes');
//router.use(errorRoutes.catchCustomErrors);
//router.use(errorRoutes.logErrors);
//router.use(errorRoutes.lastFallback);

module.exports = router;