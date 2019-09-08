const bCrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy =
  process.env.NODE_ENV == 'test'
    ? require('passport-mocked').Strategy
    : require('passport-google-oauth20').Strategy;

import keys from '../../../config';

import models from '../../db/models';

passport.serializeUser((user, done) => {
  console.log('serialize', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  models.User.findByPk(id).then(user => {
    done(null, user);
  });
});

const generateHash = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    async function(email, password, done) {
      const exisitingUser = await models.User.findOne({
        where: { email: email },
        returning: true,
        plain: true,
        raw: true,
      });
      if (exisitingUser) {
        return done(null, false, {
          message: 'That email is already taken',
        });
      }
      const userPassword = generateHash(password);

      const data = {
        email: email,
        password: userPassword,
      };
      const newUser = models.User.create(data, {
        returning: true,
        plain: true,
        raw: true,
      }).then(function(newUser, created) {
        if (!newUser) {
          return done(null, false);
        }
        if (newUser) {
          console.log('new user email', newUser.email);
          return done(null, newUser);
        }
      });
    },
  ),
);

//LOCAL SIGNIN
passport.use(
  'fake-session',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    function(email, admin, done) {
      var isValidPassword = function(email, admin) {
        return admin === true;
      };

      console.log('email');
      models.User.findOne({
        where: {
          email: email,
        },
        returning: true,
        plain: true,
        raw: true,
      })
        .then(function(user) {
          if (!user) {
            return done(null, false, {
              message: 'Email does not exist',
            });
          }
          console.log('email and admin', email, admin);

          if (!isValidPassword(email, admin)) {
            return done(null, false, {
              message: 'Incorrect password.',
            });
          }

          console.log('login user email', user.email);
          return done(null, user);
        })
        .catch(function(err) {
          console.log('Error:', err);

          return done(null, false, {
            message: 'Something went wrong with your Signin',
          });
        });
    },
  ),
);

//LOCAL SIGNIN
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },

    function(email, password, done) {
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);
      };

      models.User.findOne({
        where: {
          email: email,
        },
        returning: true,
        plain: true,
        raw: true,
      })
        .then(function(user) {
          if (!user) {
            return done(null, false, {
              message: 'Email does not exist',
            });
          }

          if (!isValidPassword(user.password, password)) {
            return done(null, false, {
              message: 'Incorrect password.',
            });
          }

          console.log('login user email', user.email);
          return done(null, user);
        })
        .catch(function(err) {
          console.log('Error:', err);

          return done(null, false, {
            message: 'Something went wrong with your Signin',
          });
        });
    },
  ),
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: keys.server.googleClientID,
      clientSecret: keys.server.googleClientSecret,
      callbackURL: '/api/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails ? profile.emails[0].value : null;

      const existingUser = await models.User.findOne({
        where: { email },
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
      done(null, user);
    },
  ),
);
