const express = require('express');
const authController = require('@/controllers/auth.controller');
const authValidation = require('@/validations/auth.validation');
const Auth = require('@/middleware/Auth');

const authRoute = express.Router();

authRoute.post('/register', authValidation.ValidatorRegister(), authController.register);

authRoute.post('/login', authValidation.ValidatorLogin(), authController.login);

authRoute.post('/logout', authController.logout);

authRoute.get('/me', Auth(), authController.getMe);

module.exports = authRoute;
