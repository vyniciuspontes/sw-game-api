var Joi = require('joi');
 
export default Joi.object({
    name: Joi.string().required(),
    terrain: Joi.string().required(),
    climate: Joi.string().required()
  
});