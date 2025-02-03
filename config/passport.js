// config/passport.js

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Secret key for JWT (use an environment variable in production)
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

module.exports = (passport) => {
  // Local strategy for handling login with username and password
  passport.use(User.createStrategy());

  // JWT strategy for handling authentication via token
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Get token from request headers
        secretOrKey: jwtSecret, // Secret key for verifying JWT
      },
      async (jwtPayload, done) => {
        try {
          // Find user based on the ID inside the token
          const user = await User.findById(jwtPayload.id);
          return user ? done(null, user) : done(null, false);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  // Passport session setup (not needed for JWT authentication but included for completeness)
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
