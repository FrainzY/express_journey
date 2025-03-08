const Joi = require('joi');

exports.addCommentSchema = Joi.object({
    content: Joi.string().min(2).max(500).required()
});