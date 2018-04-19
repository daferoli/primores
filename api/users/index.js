const usersDao = require('api/dao/users');
const uuid = require('uuid/v4');

/**
 * Creates a new user in the dao and assigns it a uid
 * @param {*} userData validated user data
 */
exports.createUser = function(userData) {
  userData.uid = uuid();

  return usersDao.upsertUser({
    uid: userData.uid
  }, userData);
};

/**
 * takes an array of uids and returns the result as an array
 * @param {Array} uids list of users to retrieve
 */
exports.getUsers = function(uids) {
  return usersDao.getUsersForQuery({
    uid: {$in: uids || []}
  });
};

/**
 * Updates a single user
 */
exports.updateUser = function(uid, userData) {
  return usersDao.updateUser({
    uid: uid
  }, {
    $set: userData
  }, {
    upsert: false,
    new: true
  });
};

exports.deleteUser = function(uid) {
  return usersDao.deleteUsers({
    uid: uid
  });
};
