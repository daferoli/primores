const router = require('express').Router();
const eventHelpers = require('api/events');
const validation = require('express-joi-validation')();
const eventsValidation = require('api/validations/events');
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

  return eventHelpers.getEvents(passedUids)
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
 * Create new event after validaing body data
 */
router.post('/', validation.body(eventsValidation.create), (req, res, next) => {
  return eventHelpers.createEvent(req.body)
  .then((createdEvent) => {
    res.json(utils.omitId(createdEvent.value));
  })
  .catch(next);
});

/**
 * update an event
 */
router.put('/:uid', validation.body(eventsValidation.update), (req, res, next) => {
  return eventHelpers.updateEvent(req.params.uid, req.body)
  .then((createdEvent) => {
    res.json(utils.omitId(createdEvent.value));
  })
  .catch(next);
});

router.delete('/:uid', (req, res, next) => {
  return eventHelpers.deleteEvent(req.params.uid)
  .then(() => {
    res.json({success:true});
  })
  .catch(next);
});

module.exports = router;
