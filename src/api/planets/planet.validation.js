var Joi = require('joi');
 
export default {
  body: {
    name: Joi.string().required(),
    terrain: Joi.string().required(),
    climate: Joi.string().required()
  }
};