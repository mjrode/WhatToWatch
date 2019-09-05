import {Router} from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
  (req, res) => {
    res.redirect('/');
  },
);

router.post(
  '/login',
  function(req, res, next) {
    console.log('Request params', req.params);
    console.log('Request body', req.body);
    console.log('Request query', req.query);
    next();
  },
  passport.authenticate('local', {
    failureRedirect: '/sign-up',
    failureFlash: true,
  }),
  function(req, res) {
    console.log('res', res.body);
    res.redirect('/');
  },
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/plex-pin');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
