const Joi = require('@hapi/joi');

const registerValidation = data => {
    const schema = Joi.object().keys({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(10).max(255).email().required(),
      password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data, { abortEarly: false });
}

const loginValidation = data => {
    const schema = Joi.object().keys({
      email: Joi.string().min(10).max(255).email().required(),
      password: Joi.string().min(6).max(1024).required(),
    });
    return schema.validate(data, { abortEarly: false });
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
