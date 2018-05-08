const router = require('express').Router({mergeParams: true});
const db = require('../logics/persistenceManager');

router.get('/', (req, res, next) => {
	res.json(db.findAllEvents());
});

router.get('/:eventId', (req, res, next) => {
  var event = db.findEvent(req.params.eventId);
	if (event == null) {
		res.json({});
	} else {
		res.json(event);
	}
});

router.get('/:eventId/participants', (req, res, next) => {
	var participantList = db.findParticipants(req.params.eventId);
	if (participantList == null) {
		res.json({});
	} else {
		res.json(participantList);
	}
});

router.post('/create', (req, res, next) => {
  var newEvent = db.addEvent(req.body.name);
  res.json({ id: newEvent.id });
});

router.post('/:eventId/addParticipant', (req, res, next) => {
  db.addParticipant(req.params.eventId, req.body.name);
  res.json({});
});

module.exports = router;
