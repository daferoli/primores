const eventsDao = require('api/dao/events');
const uuid = require('uuid/v4');

/**
 * Creates a new event in the dao and assigns it a uid
 * @param {*} eventData validated event data
 */
exports.createEvent = function(eventData) {
  eventData.uid = uuid();

  return eventsDao.upsertEvent({
    uid: eventData.uid
  }, eventData);
};

/**
 * takes an array of uids and returns the result as an array
 * @param {Array} uids list of events to retrieve
 */
exports.getEvents = function(uids) {
  return eventsDao.getEventsForQuery({
    uid: {$in: uids || []}
  });
};

/**
 * Updates a single event
 */
exports.updateEvent = function(uid, eventData) {
  return eventsDao.upsertEvent({
    uid: uid
  }, {
    $set: eventData
  }, {
    upsert: false,
    new: true
  });
};

exports.deleteEvent = function(uid) {
  return eventsDao.deleteEvents({
    uid: uid
  });
};
