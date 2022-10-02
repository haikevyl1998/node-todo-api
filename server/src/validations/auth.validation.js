const { STATUS_CODES } = require('@/constants');
const Validator = require('@/middleware/validator');
const Joi = require('joi');
const setErrorMessages = require('./helper');

const registerSchema = Joi.object().keys({
  name: Joi.string().required().messages(setErrorMessages(STATUS_CODES.NAME_INVALID)),
  username: Joi.string().required().messages(setErrorMessages(STATUS_CODES.USERNAME_INVALID)),
  password: Joi.string().required().messages(setErrorMessages(STATUS_CODES.PASSWORD_INVALID)),
});

const ValidatorRegister = () => Validator({ schema: registerSchema });

const loginSchema = Joi.object().keys({
  username: Joi.string().required().messages(setErrorMessages(STATUS_CODES.USERNAME_INVALID)),
  password: Joi.string().required().messages(setErrorMessages(STATUS_CODES.PASSWORD_INVALID)),
});

const ValidatorLogin = () => Validator({ schema: loginSchema });

module.exports = {
  ValidatorRegister,
  ValidatorLogin,
};
