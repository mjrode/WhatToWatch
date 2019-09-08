import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.post('/sign-up', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    console.log('user', user.email);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('req user email signup', req.user.email);
      res.send({ email: req.user.email });
    });
  })(req, res, next);
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log('user', user.email);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('req user email signup', req.user.email);
      res.send({ email: req.user.email });
    });
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    console.log('yumm cookies response', req.session);
    res.redirect('/plex-pin' + `?email=${req.user.email}`);
  },
);

router.get('/current_user', (req, res) => {
  console.log('current user session', req.session);
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
