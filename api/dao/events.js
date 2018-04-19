'use strict';

const db = require('api/db');

const eventCollection = db.collection('events');

exports.getEventsForQuery = function (query) {
  let projection = {};
  if (query.projection) {
    projection = query.projection;
    delete query.projection;
  }

  return eventCollection.find(query, projection)
  .then((cursor) => cursor.toArray());
};

exports.upsertEvent = function (query, event, opts) {
  const options = opts || {
    upsert: true,
    new: true
  };

  return eventCollection.findAndModify(query, null, event, options);
};

exports.deleteEvents = function (query) {
  return eventCollection.remove(query);
};
