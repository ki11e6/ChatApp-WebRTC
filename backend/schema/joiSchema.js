import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,18}$')).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,18}$')).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

export { registerSchema, loginSchema };
