const Joi = require('joi');

exports.assignTaskSchema = Joi.object({
    assigned_to: Joi.string().uuid().required(),
});