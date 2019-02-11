const express = require('express');
const plexService = require('../../../services/plex');

const router = express.Router();

router.get('/', plexService.getUsers);
// router.get('/:id', plexService.getDogWithId);

module.exports = router;
