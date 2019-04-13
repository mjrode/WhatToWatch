import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';
import request from 'request-promise';

const search = async (showName, user) => {
  try {
    const params = {
      baseUrl: user.sonarrUrl,
      uri: '/api/series/lookup',
      headers: {'x-api-key': user.sonarrApiKey},
      qs: {
        term: showName,
      },
    };
    const res = await request(params);
    const jsonData = await JSON.parse(res);
    return jsonData[0];
  } catch (error) {
    helpers.handleError(error, 'searchSonarr');
  }
};

const addSeries = async (showName, user) => {
  try {
    const body = await search(showName, user);
    body.profileId = 1;
    const rootFolder = await getRootFolder(user);
    body.rootFolderPath = JSON.parse(rootFolder)[0].path;
    const params = {
      baseUrl: user.sonarrUrl,
      uri: '/api/series',
      headers: {'x-api-key': user.sonarrApiKey},
      body: body,
      json: true,
    };

    const res = await request.post(params);
    return res;
  } catch (error) {
    console.log(error);
    return error.errorMessage;
  }
};

const getRootFolder = async user => {
  const params = {
    uri: user.sonarrUrl + '/api/rootfolder',
    headers: {'x-api-key': user.sonarrApiKey},
  };
  const res = await request(params);
  return res;
};

const getSeries = async user => {
  const params = {
    uri: user.sonarrUrl + '/api/series',
    headers: {'x-api-key': user.sonarrApiKey},
  };
  const res = await request(params);
  return res;
};

export default {search, addSeries, getSeries};
