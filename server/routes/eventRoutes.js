var express = require('express');
var router = express.Router({
  mergeParams: true
});
const events = require('../data/data').events;
const participants = require('../data/data').participants;

function findEvent(eventId) {
	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		if (eventId == event.id) {
			return event;
		}
	}
	return null;
}

function findParticipants(eventId) {
	for (var i = 0; i < participants.length; i++) {
		var participantList = participants[i];
		if (eventId == participantList.eventId) {
			return participantList;
		}
	}
	return null;
}

router.get('/', (req, res, next) => {
	res.json(events);
});

router.get('/:eventId', (req, res, next) => {
	var event = findEvent(req.params.eventId);
	if (event == null) {
		res.json({});
	} else {
		res.json(event);
	}
});

router.get('/:eventId/participants', (req, res, next) => {
	var participantList = findParticipants(req.params.eventId);
	if (participantList == null) {
		res.json({});
	} else {
		res.json(participantList);
	}
});

module.exports = router;