const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  gender:Joi.string().required(),
  status: Joi.string().required(),
  id:Joi.required()


});

exports.validateSignup = validator(signupSchema);