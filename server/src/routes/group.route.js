const Auth = require('@/middleware/Auth');
const express = require('express');
const {
  index,
  store,
  show,
  update,
  remove,
  restore,
  destroy,
  removeOne,
} = require('@/controllers/group.controller');
const {
  ValidatorStoreGroup,
  ValidatorListGroup,
  ValidatorShowGroup,
  ValidatorUpdateGroup,
  ValidatorListGroupId,
  ValidatorUpdateManyGroup,
} = require('@/validations/group.validation');
const { updateMany } = require('@/models/user.model');

const groupRoute = express.Router();

groupRoute.use(Auth());

groupRoute.get('/', ValidatorListGroup(), index);

groupRoute.post('/', ValidatorStoreGroup(), store);

groupRoute.patch('/', ValidatorUpdateManyGroup(), updateMany);

groupRoute.get('/:id', ValidatorShowGroup(), show);

groupRoute.patch('/:id', ValidatorShowGroup(), ValidatorUpdateGroup(), update);

groupRoute.delete('/:id', ValidatorShowGroup(), removeOne);

groupRoute.post('/remove', ValidatorListGroupId(), remove);

groupRoute.post('/restore', ValidatorListGroupId(), restore);

groupRoute.post('/destroy', ValidatorListGroupId(), destroy);

module.exports = groupRoute;
