import plexApi from './plexApi';
import importData from './importData';
import auth from './auth';
import models from '../../db/models';
import helpers from '../helpers';
import { Op } from 'sequelize';
import logger from '../../../config/winston';

const getPlexPin = async (req, res) => {
  try {
    logger.info(`getPlexPin(User) ${req.user}`);
    const pinRes = await auth.getPlexPin(req.user);
    const plexPinId = pinRes.pin.id['$t'];
    await models.User.update(
      { plexPinId },
      { where: { googleId: req.user.googleId } },
    );
    const pinCode = pinRes.pin.code;
    return res.json(pinCode);
  } catch (error) {
    console.log('error in auth', error);
    return res.status(201).json(error.message);
  }
};

const checkPlexPin = async (req, res) => {
  try {
    const token = await auth.checkPlexPin(
      req.user.plexPinId,
      req.user,
    );
    if (token.nil) {
      return res.json(null);
    }
    console.log('checking', req.user);
    await auth.getPlexUrl(token, req.user);
    return res.json(token);
  } catch (error) {
    console.log('error in auth', error);
    return res.status(201).json(error.message);
  }
};

const getUsers = (req, res) => {
  plexApi
    .getUsers(req.user)
    .then(users => {
      res.json(users);
    })
    .catch(helpers.handleError(res, getUsers.name));
};

const getMostWatched = async (req, res) => {
  try {
    const options = req.query;
    const mostWatched = await plexApi.getMostWatched(
      options,
      req.user,
    );
    res.json(mostWatched);
  } catch (error) {
    console.log('mike', error);
    res.json(error);
  }
};

const getSections = async (req, res) => {
  try {
    const sections = await plexApi.getSections(req.user);
    res.json(sections);
  } catch (error) {
    res.json(error);
  }
};

const getLibraryDataBySection = async (req, res) => {
  try {
    const options = { sectionId: req.params.id };
    const sections = await plexApi.getLibraryDataBySection(
      options,
      req.user,
    );
    res.json(sections);
  } catch (error) {
    res.json(error);
  }
};

const importSections = async (req, res) => {
  const sections = await importData.importSections(req.user);
  res.json(sections);
};

const importLibraries = async (req, res) => {
  const libraries = await importData.importLibraries(req.user);
  res.json(libraries);
};

const importMostWatched = async (req, res) => {
  const libraries = await importData.importMostWatched(req.user);
  res.json(libraries);
};

const importAll = async (req, res) => {
  console.log(
    'Beginning to import all data for req.user',
    req.user.email,
    req.user.id,
  );
  try {
    await importData.importSections(req.user);
    await importData.importLibraries(req.user);
    await importData.importMostWatched(req.user);
    await importData.importTvPosters(req.user);
    res.json('Successfully imported/updated data');
  } catch (error) {
    res.json(error);
  }
};

export default {
  getUsers,
  getMostWatched,
  getSections,
  getLibraryDataBySection,
  importSections,
  importLibraries,
  importMostWatched,
  importAll,
  getPlexPin,
  checkPlexPin,
};
