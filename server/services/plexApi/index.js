import plexApiClient from './plexApi';

const getUsers = async (req, res) => {
  const plexApi = plexApiClient();
  const users = await plexApi.getUsers();
  res.json(users);
};

const getMostWatched = async (req, res) => {
  const plexApi = plexApiClient();
  console.log('url---', req.query);
  const mostWatched = await plexApi.getMostWatched(req.query.type);
  res.json(mostWatched);
};

const getSections = async (req, res) => {
  const plexApi = plexApiClient();
  const sections = await plexApi.getSections();
  res.json(sections);
};

export default {
  getUsers,
  getMostWatched,
  getSections,
};
