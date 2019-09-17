// https://github.com/hapijs/joi
const Joi = require('@hapi/joi');

module.exports = (schemaObj = {}, val = {}) => {
  const schema = Joi.object().keys(schemaObj)
  const resulet = schema.validate(val)
  return resulet
}