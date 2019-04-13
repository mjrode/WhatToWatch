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

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/most-watched');
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
