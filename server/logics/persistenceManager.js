const config = require('../config/config').getConfig();
var stubManager = null;
var mongoDbManager = null;

function getStub() {
  if (stubManager == null) {
    stubManager = require('../database/stub');
  }
  return stubManager;
}

function getMongoDb() {
  if (mongoDbManager == null) {
    mongoDbManager = require('../database/mongodb');
  }
  return mongoDbManager;
}

function getPersistenceUnit() {
  if (config.dbType == "stub") {
    return getStub();
  } else if (config.dbType == "mongodb") {
    return getMongoDb();
  } else {
      console.log("dbType " + config.dbType + " is not supported!");
      process.exit(1);
  }
}

async function findAllEvents() {
  return await getPersistenceUnit().findAllEvents();
}

async function findEvent(eventId) {
  return await getPersistenceUnit().findEvent(eventId);
}

async function findParticipants(eventId) {
  return await getPersistenceUnit().findParticipants(eventId);
}

async function addEvent(name) {
  return await getPersistenceUnit().addEvent(name);
}

async function addParticipant(eventId, participantName) {
  await getPersistenceUnit().addParticipant(eventId, participantName);
}

async function updateParticipants(eventId, participantList) {
  await getPersistenceUnit().updateParticipants(eventId, participantList);
}

module.exports = {
  findAllEvents,
  findEvent,
  findParticipants,
  addEvent,
  addParticipant,
  updateParticipants
}
