const Joi = require("joi");

const loginValidation = (email, password) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
  });

  return schema.validate({ email, password });
};

const addUrlValidation = (url) => {
  const schema = Joi.object({
    url: Joi.string().min(1).required(),
  });

  return schema.validate({ url });
};

module.exports = { loginValidation, addUrlValidation };
