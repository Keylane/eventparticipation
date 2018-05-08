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

function findAllEvents() {
  return getPersistenceUnit().findAllEvents();
}

function findEvent(eventId) {
  return getPersistenceUnit().findEvent(eventId);
}

function findParticipants(eventId) {
  return getPersistenceUnit().findParticipants(eventId);
}

function addEvent(name) {
  return getPersistenceUnit().addEvent(name);
}

function addParticipant(eventId, participantName) {
  getPersistenceUnit().addParticipant(eventId, participantName);
}

module.exports = {
  findAllEvents,
  findEvent,
  findParticipants,
  addEvent,
  addParticipant
}
