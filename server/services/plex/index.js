import plexApi from './plexApi';
import importData from './importData';
import auth from './auth';

const getAuthToken = async (req, res) => {
  const {username} = req.query;
  const {password} = req.query;

  auth(username, password).then(data => {
    return res.json(data);
  });
};

const getUsers = async (req, res) => {
  console.log('getUsers-mike-');
  const users = await plexApi.getUsers();
  res.json(users);
};

const getMostWatched = async (req, res) => {
  const mostWatched = await plexApi.getMostWatched(req);
  res.json(mostWatched);
};

const getSections = async (req, res) => {
  const sections = await plexApi.getSections();
  res.json(sections);
};

const getLibraryDataBySection = async (req, res) => {
  try {
    const sections = await plexApi.getLibraryDataBySection(req);
    res.json(sections);
  } catch (error) {
    console.log(error);
  }
};

const importSections = async (req, res) => {
  const sections = await importData.importSections();
  res.json(sections);
};

const importLibraries = async (req, res) => {
  const libraries = await importData.importLibraries();
  res.json(libraries);
};

const importMostWatched = async (req, res) => {
  req.query.type = 2;
  const libraries = await importData.importMostWatched(req);
  res.json(libraries);
};

export default {
  getUsers,
  getMostWatched,
  getSections,
  getLibraryDataBySection,
  importSections,
  importLibraries,
  importMostWatched,
  getAuthToken,
};
