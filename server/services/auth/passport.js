const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../../../config');

import models from '../../db/models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.find(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.default.server.googleClientID,
      clientSecret: keys.default.server.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await models.User.findOne({
        where: {googleId: profile.id},
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await models.User.create({
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      console.log('mikes user', user);
      done(null, user);
    },
  ),
);
