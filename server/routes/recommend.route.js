import recommendController from '../controllers/recommend.controller';

const express = require('express');

const router = express.Router();

router.use(recommendController);

export default router;
