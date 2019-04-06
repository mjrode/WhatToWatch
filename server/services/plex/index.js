import plexApi from './plexApi';
import importData from './importData';
import auth from './auth';
import models from '../../db/models';
import helpers from '../helpers';

const getAuthToken = async (req, res) => {
  try {
    const {email, password, plexUrl} = req.query;
    const plexToken = await auth(email, password);
    const [rowsUpdate, updatedUser] = await models.User.update(
      {plexUrl, plexToken},
      {returning: true, where: {googleId: req.user.googleId}},
    );
    console.log('updatedUser', updatedUser);
    console.log('token', plexToken);

    return res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(201).json(error.message);
  }
};

const getUsers = (req, res) => {
  plexApi
    .getUsers()
    .then(users => {
      res.json(users);
    })
    .catch(helpers.handleError(res, getUsers.name));
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
