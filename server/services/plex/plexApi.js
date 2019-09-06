import config from '../../../config';
import helpers from '../helpers';

const getUsersUrlParams = function(user) {
  return {
    host: user.plexUrl,
    path: '/users',
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getSectionsUrlParams = function(user) {
  return {
    host: user.plexUrl,
    path: '/library/sections',
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const mostWatchedUrlParams = function(accountId, sectionKey, limit = 10, user) {
  return {
    host: user.plexUrl,
    path: '/library/all/top',
    queryParams: {
      ...(accountId && {accountId}),
      ...(sectionKey && {type: sectionKey}),
      ...(limit && {limit}),
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getLibraryDataBySectionUrlParams = function(sectionId, user) {
  return {
    host: user.plexUrl,
    path: `/library/sections/${sectionId}/all`,
    queryParams: {
      'X-Plex-Token': user.plexToken,
    },
  };
};

const getUsers = async function(user) {
  try {
    const urlParams = getUsersUrlParams(user);
    const getUsersUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getUsersUrl);
    return response.MediaContainer.User;
  } catch (error) {
    return error;
  }
};

const getMostWatched = async function(
  {accountId, sectionKey, limit = 10},
  user,
) {
  try {
    console.log('section key mike --', sectionKey);
    const urlParams = mostWatchedUrlParams(accountId, sectionKey, limit, user);
    const mostWatchedUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(mostWatchedUrl);
    console.log('most-watched-raw-response---', response);
    if (response.MediaContainer.Metadata) {
      return response.MediaContainer.Metadata;
    } else {
      return [];
    }
  } catch (error) {
    console.log('getMostWatched plexAPI error', error);
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getSections = async function(user) {
  try {
    const urlParams = getSectionsUrlParams(user);
    const getSectionsUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getSectionsUrl);
    return response.MediaContainer.Directory;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
    };
  }
};

const getLibraryDataBySection = async function({sectionKey}, user) {
  try {
    console.log('sectionId--', sectionKey);
    const urlParams = getLibraryDataBySectionUrlParams(sectionKey, user);
    const getLibraryDataBySectionUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getLibraryDataBySectionUrl);
    console.log('library-data-by-section---', response.MediaContainer.Metadata);
    return response.MediaContainer.Metadata;
  } catch (error) {
    console.log('caught error', error);
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
