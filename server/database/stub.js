let eventIdSequence = 3;
let eventsStub = [
  { id: 1, name: 'Sommerfest 2018'},
  { id: 2, name: 'Julefrokost 2017'}
];
let participantsStub = [
  { eventId: 1, participants: [{name: "Anders Helmar"}, {name: "Christian Hessenbruch"}, {name: "Tim Dettloff"}, {name: "Rasmus Nørgaard"}] },
  { eventId: 2, participants: [{name: "Jesper Essendrop"}, {name: "Rasmus Nørgaard"}] }
];

function findAllEvents() {
  return eventsStub;
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

function addParticipant(eventId, participantName) {
  var participantObj = findParticipants(eventId);
  if (participantObj != null) {
    participantObj.participants.push({name: participantName});
  }
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
  addParticipant,
  updateParticipants
}
