const { STATUS_CODES, PRIORITIES, SORTS } = require('@/constants');
const Validator = require('@/middleware/validator');
const Joi = require('joi');
const setErrorMessages = require('./helper');

const lisGroupSchema = Joi.object().keys({
  priority: Joi.string().valid(PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW),
  totalTask: Joi.string().valid(SORTS.ASC, SORTS.DESC),
  createdAt: Joi.string().valid(SORTS.ASC, SORTS.DESC),
});

const ValidatorListGroup = () => Validator({ inputField: 'query', schema: lisGroupSchema });

const storeGroupSchema = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(setErrorMessages(STATUS_CODES.GROUP_NAME_INVALID)),
  description: Joi.string()
    .max(150)
    .messages(setErrorMessages(STATUS_CODES.GROUP_DESCRIPTION_INVALID)),
  priority: Joi.string()
    .required()
    .valid(PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW)
    .messages(setErrorMessages(STATUS_CODES.GROUP_PRIORY_INVALID)),
});

const ValidatorStoreGroup = () => Validator({ schema: storeGroupSchema });

const updateGroupSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50).messages(setErrorMessages(STATUS_CODES.GROUP_NAME_INVALID)),
  description: Joi.string()
    .max(150)
    .messages(setErrorMessages(STATUS_CODES.GROUP_DESCRIPTION_INVALID)),
  priory: Joi.string()
    .valid(PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW)
    .messages(setErrorMessages(STATUS_CODES.GROUP_PRIORY_INVALID)),
});

const ValidatorUpdateGroup = () => Validator({ schema: updateGroupSchema });

const idSchema = Joi.object().keys({
  id: Joi.number().required().messages(setErrorMessages('ID_INVALID')),
});

const ValidatorShowGroup = () => Validator({ inputField: 'params', schema: idSchema });

const listGroupIdSchema = Joi.object().keys({
  groups: Joi.array().items(Joi.number()),
});

const ValidatorListGroupId = () => Validator({ schema: listGroupIdSchema });

const updateManyGroupSchema = Joi.object().keys({
  groups: Joi.array().items(
    Joi.object().keys({
      id: Joi.number(),
      priority: Joi.string()
        .valid(PRIORITIES.HIGH, PRIORITIES.MEDIUM, PRIORITIES.LOW)
        .messages(setErrorMessages(STATUS_CODES.GROUP_PRIORY_INVALID)),
    }),
  ),
});

const ValidatorUpdateManyGroup = () => Validator({ schema: updateManyGroupSchema });

module.exports = {
  ValidatorListGroup,
  ValidatorStoreGroup,
  ValidatorUpdateGroup,
  ValidatorShowGroup,
  ValidatorListGroupId,
  ValidatorUpdateManyGroup,
};
