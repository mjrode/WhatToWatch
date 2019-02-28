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
  try {
    const users = await plexApi.getUsers();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const getMostWatched = async (req, res) => {
  try {
    const options = req.query;
    const mostWatched = await plexApi.getMostWatched(options);
    res.json(mostWatched);
  } catch (error) {
    res.json(error);
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await plexApi.getSections();
    res.json(sections);
  } catch (error) {
    res.json(error);
  }
};

const getLibraryDataBySection = async (req, res) => {
  try {
    const options = {sectionId: req.params.id};
    const sections = await plexApi.getLibraryDataBySection(options);
    res.json(sections);
  } catch (error) {
    res.json(error);
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
  const libraries = await importData.importMostWatched();
  res.json(libraries);
};

const importAll = async (req, res) => {
  await importData.importSections();
  await importData.importLibraries();
  const data = await importData.importMostWatched();
  res.json(data);
};

export default {
  getAuthToken,
  getUsers,
  getMostWatched,
  getSections,
  getLibraryDataBySection,
  importSections,
  importLibraries,
  importMostWatched,
  importAll,
};
