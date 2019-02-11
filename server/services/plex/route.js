import { Router } from 'express';

const router = Router();
// const actionController = require('../controllers/action.controller');

// router.post('/points', actionController.populatePointMessage);
// router.post('/', actionController.handleActionResponse);

router.get('/', actionController.);
router.get('/', (req, res) => {
  res.json({
    msg: 'Plex server autenticated',
  });
});

export default router;
