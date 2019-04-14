import plexApi from './plexApi';
import importData from './importData';
import auth from './auth';
import models from '../../db/models';
import helpers from '../helpers';
import request from 'request-promise';

const getAuthToken = async (req, res) => {
  try {
    const {email, password, sonarrUrl, sonarrApiKey} = req.query;
    const plexToken = await auth.fetchToken(email, password);
    console.log('plex token', plexToken.includes('401'));
    if (plexToken.includes('401')) {
      return res.json('Invalid username or password.');
    }
    const plexUrl = await auth.plexUrl(plexToken);
    const [rowsUpdate, updatedUser] = await models.User.update(
      {plexUrl, plexToken, sonarrUrl, sonarrApiKey},
      {returning: true, where: {googleId: req.user.googleId}},
    );

    return res.json(updatedUser);
  } catch (error) {
    console.log('error in auth', error);
    return res.status(201).json(error.message);
  }
};

const getPlexPin = async (req, res) => {
  try {
    const pinRes = await auth.getPlexPin(req.user);
    const plexPinId = pinRes.pin.id['$t'];
    await models.User.update(
      {plexPinId},
      {where: {googleId: req.user.googleId}},
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
    const token = await auth.checkPlexPin(req.user.plexPinId, req.user);
    if (token.nil) {
      return res.json(null);
    }
    await auth.getPlexUrl(req.user, token);
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
    const mostWatched = await plexApi.getMostWatched(options, req.user);
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
    const options = {sectionId: req.params.id};
    const sections = await plexApi.getLibraryDataBySection(options, req.user);
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
  getAuthToken,
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
