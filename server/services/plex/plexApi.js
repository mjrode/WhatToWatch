import axios from 'axios';
import buildUrlPack from 'build-url';
import config from '../../../config';
import formatResponse from './helpers';

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

const buildUrl = function(urlParams) {
  try {
    const params = urlParams;
    const {host} = params;
    delete params.host;
    const urlHash = params;

    return buildUrlPack(host, urlHash);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const request = async function(url) {
  console.log('Request URL', url);
  return new Promise((resolve, reject) => {
    const httpClient = axios;
    httpClient
      .get(url)
      .then(response => {
        return resolve(formatResponse(response));
      })
      .catch(error => {
        if (error.response) {
          console.log('status', error.response.status);
          console.log('headers', error.response.headers);
          return reject(error.response);
        }
        if (error.request) {
          console.log('request', error.request);
        } else {
          console.log('Error', error.message);
        }
        return reject(error);
      });
  });
};

const getUsers = async function() {
  const urlParams = getUsersUrlParams();
  const getUsersUrl = buildUrl(urlParams);
  const response = await request(getUsersUrl);
  return response.MediaContainer.User;
};

const getMostWatched = async function(req) {
  const urlParams = mostWatchedUrlParams(req);
  const mostWatchedUrl = buildUrl(urlParams);
  const response = await request(mostWatchedUrl);
  return response.MediaContainer.Metadata;
};

const getSections = async function() {
  const urlParams = getSectionsUrlParams();
  const getSectionsUrl = buildUrl(urlParams);
  const response = await request(getSectionsUrl);
  return response.MediaContainer.Directory;
};

const getLibraryDataBySection = async function(req) {
  try {
    const urlParams = getLibraryDataBySectionUrlParams(req);
    const getLibraryDataBySectionUrl = buildUrl(urlParams);
    const response = await request(getLibraryDataBySectionUrl);
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
  buildUrl,
  request,
};
