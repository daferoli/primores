'use strict';

const db = require('api/db');
const userCollection = db.collection('users');

exports.getUsersForQuery = function (query) {
  let projection = {};
  if (query.projection) {
    projection = query.projection;
    delete query.projection;
  }

  return userCollection.find(query, projection)
  .then((cursor) => cursor.toArray());
};

exports.upsertUser = function (query, user) {
  const options = {
    upsert: true,
    new: true
  };

  return userCollection.findAndModify(query, null, user, options);
};

exports.deleteUsers = function (query) {
  return userCollection.remove(query);
};
