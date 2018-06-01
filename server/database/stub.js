var statusEnum = require("../logics/enums").participationStatus;

let eventIdSequence = 3;
let eventsStub = [
  { id: 1, name: 'Sommerfest 2018'}
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
		if (eventId == event.id) {
			return event;
		}
	}
	return null;
}

function findParticipants(eventId) {
  for (var i = 0; i < participantsStub.length; i++) {
		var participantObj = participantsStub[i];
		if (eventId == participantObj.eventId) {
			return participantObj;
		}
	}
	return null;
}

function addEvent(eventName) {
  let newEvent = {id: eventIdSequence, name: eventName};
  let newParticipantEntry = { eventId: eventIdSequence, participants: [] }
  eventIdSequence++;
  eventsStub.push(newEvent);
  participantsStub.push(newParticipantEntry);
  return newEvent;
}

function updateParticipants(eventId, participantList) {
  var participantObj = findParticipants(eventId);
  if (participantObj != null) {
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
