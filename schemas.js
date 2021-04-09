const Joi = require('joi');

module.exports.projectSchema = Joi.object ({
  project: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    craft: Joi.string().required(),
    yarnCategory: Joi.string().required(),
    tool: Joi.string().required(),
    toolSize: Joi.number().required().min(0)
  }).required()
});