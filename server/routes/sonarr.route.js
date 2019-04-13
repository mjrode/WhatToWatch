import sonarrController from '../controllers/sonarr.controller';

const express = require('express');

const router = express.Router();

router.use(sonarrController);

export default router;
