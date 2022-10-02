const passport = require('@/plugins/passport');

const Auth = (req, res, next) => passport.authenticate('jwt', { session: false });

module.exports = Auth;
