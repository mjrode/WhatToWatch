const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import keys from '../../../config';

import models from '../../db/models';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findByPk(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.server.googleClientID,
      clientSecret: keys.server.googleClientSecret,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      const existingUser = await models.User.findOne({
        where: {googleId: '103913097386807680151'},
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
