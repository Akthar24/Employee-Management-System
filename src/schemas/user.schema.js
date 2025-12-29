const Joi = require("joi");

exports.signupSchema = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  mobile: Joi.number().integer().required(),
  address: Joi.string().max(100).required(),
  gender: Joi.string().required(),
  password: Joi.string().min(6).required()
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
