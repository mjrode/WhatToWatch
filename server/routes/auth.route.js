import authController from '../controllers/auth.controller';

const express = require('express');

const router = express.Router();

router.use(authController);

export default router;
