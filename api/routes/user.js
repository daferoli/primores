const router = require('express').Router();
const userHelpers = require('api/users');
const validation = require('express-joi-validation')();
const usersValidation = require('api/validations/users');
const utils = require('api/utils');

/**
 * This will get an employee for query
 * It can either list if an array is passed in or read if a string is passed in
 */
router.get('/', (req, res, next) => {
  const reqUids = JSON.parse(req.query.uids);
  let passedUids;
  let returnArray = false;

  if (utils.isString(reqUids)) {
    passedUids = [reqUids];
  } else if (utils.isArray(reqUids)) {
    passedUids = reqUids;
    returnArray = true;
  } else {
    const err = new Error('Passed variable is not valid');
    req.status(400).json(err);
  }

  return userHelpers.getUsers(passedUids)
  .then((result) => {
    const removedIds = utils.omitIdsFromArray(result);
    if (returnArray) {
      //Expects all from array
      res.json(removedIds)
    } else {
      //Expects only one
      res.json(removedIds[0]);
    }
  })
  .catch(next);
});

/**
 * Create new user after validaing body data
 */
router.post('/', validation.body(usersValidation.create), (req, res, next) => {
  return userHelpers.createUser(req.body)
  .then((createdUser) => {
    res.json(utils.omitId(createdUser.value));
  })
  .catch(next);
});

/**
 * update an user
 */
router.put('/:uid', validation.body(usersValidation.update), (req, res, next) => {
  return userHelpers.updateuser(req.params.uid, req.body)
  .then((createduser) => {
    res.json(utils.omitId(createduser.value));
  })
  .catch(next);
});

router.delete('/:uid', (req, res, next) => {
  return userHelpers.deleteuser(req.params.uid)
  .then(() => {
    res.json({success:true});
  })
  .catch(next);
});

module.exports = router;
