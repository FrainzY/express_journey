const Joi = require('joi');

exports.taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().optional(true).allow(""),
    status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    due_date: Joi.date().greater("now").optional(),
});

exports.updateTaskSchema = Joi.object({
    titel: Joi.string().min(3).max(100).optional(),
    description: Joi.string().optional().allow(""),
    status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
    priority: Joi.string().valid('Low', 'Medium', 'High').required(),
    due_date: Joi.date().greater("now").optional(),
});

