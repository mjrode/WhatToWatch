import plexController from '../controllers/plex.controller';

const express = require('express');

const router = express.Router();

console.log('Made it here');
router.use(plexController);

export default router;
