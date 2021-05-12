const Joi = require('joi');

//PROJECT VALIDATION
module.exports.projectSchema = Joi.object ({
  project: Joi.object({
    title: Joi.string().required(),
    // image: Joi.string().required(),
    pattern: Joi.string().required(),
    craft: Joi.string().required(),
    yarnCategory: Joi.string().required(),
    tool: Joi.string().required(),
    toolSize: Joi.number().required().min(0)
  }).required()
});

//COMMENT VALIDATION
module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required()
  }).required()
});