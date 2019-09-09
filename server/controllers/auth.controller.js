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
      res.send({ email: req.user.email });
    });
  })(req, res, next);
});
router.post('/fake-session', (req, res, next) => {
  passport.authenticate('fake-session', function(err, user, info) {
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
      res.send({ email: req.user.email });
    });
  })(req, res, next);
});
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
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
      res.send({ email: req.user.email });
    });
  })(req, res, next);
});

router.get(
  '/google/callback',
  passport.authenticate('google'),
  function(req, res) {
    res.redirect('/plex-pin' + `?email=${req.user.email}`);
  },
);

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
