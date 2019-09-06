import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  (req, res) => {
    res.send(req.user);
  },
);

router.post('/sign-up', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      console.log('sign up error', err);
      return next(err);
    }
    if (!user) {
      console.log('no user returned', info);
      return res.json({ message: info.message });
    }
    console.log('user found', user);
    res.json(user);
  })(req, res, next);
});

router.post('/login', passport.authenticate('local-login'), function(
  req,
  res,
) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  console.log('User in session', req.user);
  res.redirect('/');
});

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.send(req.user);
  },
);

router.get('/current_user', (req, res) => {
  console.log('current user', req.user);
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
