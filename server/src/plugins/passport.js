'use strict';

const { TOKEN_TYPES } = require('@/constants');
const User = require('@/models/user.model');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWt = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const JWTOptions = {
  jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JWTStrategy(JWTOptions, async (payload, done) => {
  try {
    const { type, userId } = payload;

    if (type !== TOKEN_TYPES.ACCESS_TOKEN) {
      return done(null, false);
    }

    const user = await User.findOne({ id: userId });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(null, false);
  }
});

passport.use(strategy);

module.exports = passport;
