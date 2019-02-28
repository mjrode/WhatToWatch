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

const mostWatchedUrlParams = function(accountId, sectionKey, limit = 10) {
  return {
    host: config.plex.plexServerUrl,
    path: '/library/all/top',
    queryParams: {
      ...(accountId && {accountId}),
      ...(sectionKey && {type: sectionKey}),
      ...(limit && {limit}),
      'X-Plex-Token': config.plex.token,
    },
  };
};

const getLibraryDataBySectionUrlParams = function(sectionId) {
  return {
    host: config.plex.plexServerUrl,
    path: `/library/sections/${sectionId}/all`,
    queryParams: {
      'X-Plex-Token': config.plex.token,
    },
  };
};

const getUsers = async function() {
  try {
    const urlParams = getUsersUrlParams();
    const getUsersUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getUsersUrl);
    return response.MediaContainer.User;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getMostWatched = async function({accountId, sectionKey, limit = 10}) {
  try {
    const urlParams = mostWatchedUrlParams(accountId, sectionKey, limit);
    const mostWatchedUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(mostWatchedUrl);
    return response.MediaContainer.Metadata;
  } catch (error) {
    console.log(error);
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getSections = async function() {
  try {
    const urlParams = getSectionsUrlParams();
    const getSectionsUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getSectionsUrl);
    return response.MediaContainer.Directory;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getLibraryDataBySection = async function({sectionId}) {
  try {
    const urlParams = getLibraryDataBySectionUrlParams(sectionId);
    const getLibraryDataBySectionUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getLibraryDataBySectionUrl);
    return response.MediaContainer.Metadata;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
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
