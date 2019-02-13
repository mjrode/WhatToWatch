import plexApiClient from './plexApi';

const getUsers = async (req, res) => {
  const plexApi = plexApiClient();
  const users = await plexApi.getUsers();
  res.json(users);
};

export default {
  getUsers,
};
