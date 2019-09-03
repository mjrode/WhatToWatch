import { Router } from 'express';
import models from '../db/models'
const router = Router();

router.get('/users', async (req, res) => {
  const users = await models.User.findAll()

  res.send(users);
});

export default router;
