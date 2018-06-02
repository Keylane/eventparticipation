const path = require("path");
const Event = require(path.join(__dirname + '/models/Event'));
const Participant = require(path.join(__dirname + '/models/Participant'));

async function findAllEvents() {
  return await Event.find().sort({ creationDate: -1 }).exec();
}

async function findEvent(eventId) {
  return await Event.findById(eventId).exec();
}

async function findParticipant(eventId) {
  return await Participant.findOne({event: eventId}).exec();
}

async function findParticipants(eventId) {
  var participant = await findParticipant(eventId);
  if (!participant) {
    return null;
  }
  return participant.participants;
}

async function addEvent(eventName) {
  let newEvent = new Event({
      name: eventName
  });
  return await newEvent.save();
}

async function updateParticipants(eventId, participantList) {
  var participant = await findParticipant(eventId);
  if (!participant) {
    var participant = new Participant({
      event: eventId
    });
  }
  participant.participants = [];
  for (var i = 0; i < participantList.length; i++) {
    var p = participantList[i];
    participant.participants.push({
      name: p.name,
      status: p.status
    });
  }
  await participant.save();
}

module.exports = {
  findAllEvents,
  findEvent,
  findParticipants,
  addEvent,
  updateParticipants
}
