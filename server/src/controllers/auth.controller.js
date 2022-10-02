'use strict';

const { STATUS_CODES, TOKEN_TYPES } = require('@/constants');
const User = require('@/models/user.model');
const AppError = require('@/utils/appError');
const CatchAsync = require('@/utils/catchAsync');
const JWT = require('jsonwebtoken');

const sign = (userId) =>
  JWT.sign(
    {
      iss: 'Hai Nguyen',
      userId,
      iat: new Date().getTime(),
      type: TOKEN_TYPES.ACCESS_TOKEN,
    },
    process.env.JWT_SECRET,
  );

const register = CatchAsync(async (req, res, next) => {
  const { name, username, password } = req.data.body;
  const existingUser = await User.isTakenUsername(username);
  if (existingUser) return next(new AppError(STATUS_CODES.USERNAME_ALREADY_TAKEN, 401));
  await User.create({ name, username, password });
  res.result = { statusCode: 201 };
  return next(res);
});

const login = CatchAsync(async (req, res, next) => {
  const { username, password } = req.data.body;
  const existingUser = await User.findOne({ username });
  if (!existingUser) return next(new AppError(STATUS_CODES.USERNAME_OR_PASSWORD_INCORRECT, 401));

  const isMatchedPassword = await existingUser.isMatchedPassword(password);
  if (!isMatchedPassword)
    return next(new AppError(STATUS_CODES.USERNAME_OR_PASSWORD_INCORRECT, 401));

  res.result = {
    data: {
      user: existingUser,
      token: sign(existingUser._id),
    },
  };
  return next(res);
});

const logout = () => {};

const getMe = CatchAsync((req, res, next) => {
  res.result = {
    data: req.user,
  };
  return next(res);
});

module.exports = { register, login, logout, getMe };
