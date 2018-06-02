const router = require('express').Router({mergeParams: true});
const db = require('../logics/persistenceManager');
const mw = require('./middleware');

router.get('/', mw.asyncRoute(async (req, res, next) => {
	var events = await db.findAllEvents();
	res.json(events);
}));

router.get('/:eventId', mw.asyncRoute(async (req, res, next) => {
  var event = await db.findEvent(req.params.eventId);
	if (event == null) {
		res.json({});
	} else {
		res.json(event);
	}
}));

router.get('/:eventId/participants', mw.asyncRoute(async (req, res, next) => {
	var participantList = await db.findParticipants(req.params.eventId);
	if (!participantList) {
		res.json([]);
	} else {
		res.json(participantList);
	}
}));

router.post('/create', mw.asyncRoute(async (req, res, next) => {
  var newEvent = await db.addEvent(req.body.name);
  res.json({ id: newEvent.id });
}));

router.post('/:eventId/addParticipant', mw.asyncRoute(async (req, res, next) => {
  await db.addParticipant(req.params.eventId, req.body.name);
  res.json({});
}));

router.post('/:eventId/updateParticipants', mw.asyncRoute(async (req, res, next) => {
	await db.updateParticipants(req.params.eventId, req.body.participants);
  res.json({});
}));

module.exports = router;
