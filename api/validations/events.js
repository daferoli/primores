const Joi = require('joi');

const eventGet = Joi.array().items(Joi.string().guid({version:['uuidv4']}).required());

const eventCreate = Joi.object().keys({
  office: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  attendees: Joi.array().items(Joi.string().guid({version:['uuidv4']})),
  cost: Joi.number().min(0).precision(2),
  date: Joi.date().iso().min('now').required()
});

const eventUpdate = Joi.object().keys({
  uid: Joi.string().guid({version:['uuidv4']}),
  office: Joi.string(),
  name: Joi.string(),
  description: Joi.string(),
  attendees: Joi.array().items(Joi.string().guid({version:['uuidv4']})),
  cost: Joi.number().min(0).precision(2),
  date: Joi.date().iso().min('now')
});

module.exports = {
  get: eventGet,
  create: eventCreate,
  update: eventUpdate,
  opts: { //These are the default options for body requests for express-joi-validation
    convert: true,
    allowUnknown: false,
    abortEarly: false
  }
};

