import movieDbController from '../controllers/movieDb.controller';

const express = require('express');

const router = express.Router();

router.use(movieDbController);

export default router;
