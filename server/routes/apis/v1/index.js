const express = require('express');
const plexController = require('../../../controllers/apis/plex');

const router = express.Router();

router.use('/plex', plexController);

module.exports = router;
