import config from '../../../config';
import helpers from './helpers';

const getUsersUrlParams = function() {
  return {
    host: config.plex.plexApiUrl,
    path: '/users',
    queryParams: {
      'X-Plex-Token': config.plex.token,
    },
  };
};

const getSectionsUrlParams = function() {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/sections',
    queryParams: {
      'X-Plex-Token': config.plex.token,
    },
  };
};

const mostWatchedUrlParams = function(req) {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/all/top',
    queryParams: {
      ...(req && req.query.accountID && {accountID: req.query.accountID}),
      ...(req && req.query.type && {type: req.query.type}),
      ...((req && (req.query.limit && {limit: req.query.limit})) || {
        limit: 10,
      }),
      'X-Plex-Token': config.plex.token,
    },
  };
};

const getLibraryDataBySectionUrlParams = function(req) {
  const sectionId = req.sectionId || req.params.id;
  return {
    host: config.plex.plexServerUrl,
    path: `/library/sections/${sectionId}/all`,
    queryParams: {
      'X-Plex-Token': config.plex.token,
    },
  };
};

const getUsers = async function() {
  const urlParams = getUsersUrlParams();
  const getUsersUrl = helpers.buildUrl(urlParams);
  const response = await helpers.request(getUsersUrl);
  return response.MediaContainer.User;
};

const getMostWatched = async function(req) {
  const urlParams = mostWatchedUrlParams(req);
  const mostWatchedUrl = helpers.buildUrl(urlParams);
  const response = await helpers.request(mostWatchedUrl);
  return response.MediaContainer.Metadata;
};

const getSections = async function() {
  try {
    const urlParams = getSectionsUrlParams();
    const getSectionsUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getSectionsUrl);
    return response.MediaContainer.Directory;
  } catch (error) {
    return error;
  }
};

const getLibraryDataBySection = async function(req) {
  try {
    const urlParams = getLibraryDataBySectionUrlParams(req);
    const getLibraryDataBySectionUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getLibraryDataBySectionUrl);
    return response.MediaContainer.Metadata;
  } catch (error) {
    return error;
  }
};

export default {
  getUsers,
  getMostWatched,
  getSections,
  getLibraryDataBySection,
  getUsersUrlParams,
  getLibraryDataBySectionUrlParams,
  getSectionsUrlParams,
};
