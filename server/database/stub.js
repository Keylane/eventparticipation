let eventIdSequence = 3;
let eventsStub = [
  { id: 1, name: 'Sommerfest'},
  { id: 2, name: 'Julefrokost'}
];
let participantsStub = [
  { eventId: 1, participants: ["Anders Helmar", "Christian Hessenbruch", "Tim Dettloff", "Rasmus Nørgaard"] },
  { eventId: 2, participants: ["Jesper Essendrop", "Rasmus Nørgaard"] }
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
		var participantList = participantsStub[i];
		if (eventId == participantList.eventId) {
			return participantList.participants;
		}
	}
	return null;
}

function addEvent(eventName) {
  let newEvent = {id: eventIdSequence, name: eventName};
  eventIdSequence++;
  eventsStub.push(newEvent);
  return newEvent;
}

function addParticipant(eventId, participantName) {
  var participantList = findParticipants(eventId);
  if (participantList != null) {
      participantList.push(participantName);
  }
}

module.exports = {
  findAllEvents,
  findEvent,
  findParticipants,
  addEvent,
  addParticipant
}
