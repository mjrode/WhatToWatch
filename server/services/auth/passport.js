const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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

// passport.use(
//   new LocalStrategy(
//     {usernameField: 'email', passwordField: 'password'},
//     async (email, password, done) => {
//       try {
//         console.log('Made it to passport', email);
//         const existingUser = await User.findOne({email: email});
//         if (existingUser) {
//           done(null, existingUser);
//         }
//         if (!user) {
//           done(null, false, {message: 'Incorrect username.'});
//         }
//         if (!user.validPassword(password)) {
//           done(null, false, {message: 'Incorrect password.'});
//         }
//         const hashedPassword = generateHash(password);
//         const user = await models.User.create({
//           email: email,
//           password: hashedPassword,
//         });

//         done(null, user);
//       } catch (error) {
//         console.log('passport error', error);
//         done(error);
//       }
//     },
//   ),
// );

passport.use(
  new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    function(username, password, done) {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (!user.validPassword(password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, user);
      });
    },
  ),
);

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

// should export to commonUtils file
const generateHash = string => {
  return bCrypt.hashSync(string, bCrypt.genSaltSync(8), null);
};
