const Joi = require('joi');

module.exports = {
    create: Joi.object().keys({
        name: Joi.string().required(),
        office: Joi.string().required(),
        region: Joi.string(),
        eventsAttended: Joi.array().items(Joi.string()),
        email: Joi.string().email().required()
    })
};
