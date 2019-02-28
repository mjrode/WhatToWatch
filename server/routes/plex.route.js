import plexController from '../controllers/plex.controller';

const express = require('express');

const router = express.Router();

router.use(plexController);

export default router;
