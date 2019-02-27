import Strategy from 'passport-local';
import bCrypt from 'bcrypt-nodejs';

module.exports = function(passport, user) {
  const User = user;

  const LocalStrategy = Strategy;

  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        const generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        User.findOne({
          where: {
            email,
          },
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: 'That email is already taken',
            });
          }
          const userPassword = generateHash(password);

          const data = {
            email,

            password: userPassword,

            firstname: req.body.firstname,

            lastname: req.body.lastname,
          };

          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }

            if (newUser) {
              return done(null, newUser);
            }
          });
        });
      },
    ),
  );
};
