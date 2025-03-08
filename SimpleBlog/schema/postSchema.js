const Joi = require('joi')

exports.createUpdateSchema = Joi.object({
    title: Joi.string().min(5).max(100),
    content: Joi.string().min(10)
});