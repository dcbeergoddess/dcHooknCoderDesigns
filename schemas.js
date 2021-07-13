const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

//HTML EJS SECURITY - NOT ALLOW HTML IN TEST FIELDS
const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
      'string.escapeHTML': '{{#label}} must not include HTML!'
  },
  rules: {
      escapeHTML: {
          validate(value, helpers) {
              const clean = sanitizeHtml(value, {
                  allowedTags: [],
                  allowedAttributes: {},
              });
              if (clean !== value) return helpers.error('string.escapeHTML', { value })
              return clean;
          }
      }
  }
});

const Joi = BaseJoi.extend(extension);

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
  }).required(),
  deleteImages: Joi.array()
});

//COMMENT VALIDATION
module.exports.commentSchema = Joi.object({
  comment: Joi.object({
    body: Joi.string().required().escapeHTML()
  }).required()
});