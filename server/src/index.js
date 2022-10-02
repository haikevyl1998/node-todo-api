require('module-alias/register');
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');
const Decorator = require('./middleware/decorator');
const passport = require('@/plugins/passport');

const bootstrap = async () => {
  await mongoose.connect(process.env.MONGO_URL);

  const app = express();

  app.use(morgan('dev'));

  app.use(helmet());

  app.use(cors({ origin: true }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());

  app.use('/api', router);

  app.use(Decorator);

  app.listen(8000, () => {
    console.log('http://localhost:8000');
  });
};

bootstrap();
