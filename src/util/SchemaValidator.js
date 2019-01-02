import Joi from 'joi';

const allowedMethods = ['put', 'post'];

const options = {
    abortEarly: false, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true // remove unknown keys from the validated data
};

export default (schema) => {

    return (req, res, next) => {

        const method = req.method.toLowerCase();

        if (allowedMethods.includes(method) && schema) {

            return Joi.validate(req.body, schema, options, (err, data) => {

                if (err) {

                    const JoiError = {
                        error: {

                            object: err._object,
                            
                            details: err.details.map(({ message, type, context }) => ({
                                message: message.replace(/['"]/g, ''),
                                type,
                                context
                            }))
                        }
                    };

                    res.status(422).json(JoiError);

                } else {
                    req.body = data;
                    next();
                }

            });
        }
    };

};