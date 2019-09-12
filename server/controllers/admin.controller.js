import { Router } from 'express';
import models from '../db/models';
const router = Router();

router.get('/users', async (req, res) => {
  const users = await models.User.findAll();
  const filteredUsers = users.filter(user => user.plexToken);

  res.send(filteredUsers);
});

router.get('/login-as-user', async (req, res) => {
  res.send(users);
});

export default router;
