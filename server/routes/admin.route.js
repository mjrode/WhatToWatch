import adminController from '../controllers/admin.controller';

const express = require('express');

const router = express.Router();

router.use(adminController);

export default router;
