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
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    res.json(user);
  })(req, res, next);
});

router.post('/login', passport.authenticate('local-login'), function(
  req,
  res,
) {
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
