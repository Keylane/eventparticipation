var statusEnum = require("../logics/enums").participationStatus;

let eventIdSequence = 2;
let eventsStub = [
  { _id: 1, name: 'Sommerfest 2018'}
];
let participantsStub = [
  { eventId: 1, participants: [{name: "Anders Helmar", status: statusEnum.Accepted}, {name: "Christian Hessenbruch", status: statusEnum.Accepted}, {name: "Tim Dettloff", status: statusEnum.Accepted}, {name: "Rasmus Nørgaard", status: statusEnum.Accepted}] }
];

function findAllEvents() {
  return eventsStub.reverse();
}

function findEvent(eventId) {
  var events = findAllEvents();
	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		if (eventId == event._id) {
			return event;
		}
	}
	return null;
}

function findParticipantObj(eventId) {
  for (var i = 0; i < participantsStub.length; i++) {
		var participantObj = participantsStub[i];
		if (eventId == participantObj.eventId) {
			return participantObj;
		}
	}
	return null;
}

function findParticipants(eventId) {
  var participantObj = findParticipantObj(eventId);
  if (participantObj) return participantObj.participants;
	return null;
}

function addEvent(eventName) {
  let newEvent = {_id: eventIdSequence, name: eventName};
  let newParticipantEntry = { eventId: eventIdSequence, participants: [] }
  eventIdSequence++;
  eventsStub.push(newEvent);
  participantsStub.push(newParticipantEntry);
  return newEvent;
}

function updateParticipants(eventId, participantList) {
  var participantObj = findParticipantObj(eventId);
  if (participantObj) {
    participantObj.participants = participantList;
  }
}

module.exports = {
  findAllEvents,
  findEvent,
  findParticipants,
  addEvent,
  updateParticipants
}
