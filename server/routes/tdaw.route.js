import tdawController from '../controllers/tdaw.controller';

const express = require('express');

const router = express.Router();

router.use(tdawController);

export default router;
