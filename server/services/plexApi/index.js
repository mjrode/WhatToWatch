import plexApiClient from './plexApi';

const getUsers = async (req, res) => {
  const plexApi = plexApiClient();
  const users = await plexApi.getUsers();
  res.json(users);
};

const getMostWatched = async (req, res) => {
  const plexApi = plexApiClient();
  const mostWatched = await plexApi.getMostWatched(2);
  res.json(mostWatched);
};

export default {
  getUsers,
  getMostWatched,
};
