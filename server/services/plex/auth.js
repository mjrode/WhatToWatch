import parser from 'xml2json';
import uuid from 'uuid';
import btoa from 'btoa';
import request from 'request-promise';
import models from '../../db/models';
import logger from '../../../config/winston';

const getPlexPin = async user => {
  try {
    logger.info(`getPlexPin(User) ${user}`);
    const params = {
      url: 'https://plex.tv/pins.xml',
      headers: {
        'X-Plex-Client-Identifier': user.email,
      },
    };
    const res = await request.post(params);
    const formattedResponse = JSON.parse(parser.toJson(res));

    return formattedResponse;
  } catch (error) {
    logger.error(error);
    return error.message;
  }
};

const fetchToken = async (username, password) => {
  try {
    const res = await request.post(
      tokenUrlParams(username, password),
    );
    const token = res.match(rxAuthToken)[1];
    return token;
  } catch (error) {
    return error.message;
  }
};

const tokenUrlParams = (username, password) => ({
  url: 'https://plex.tv/users/sign_in.xml',
  headers: {
    'X-Plex-Client-Identifier': uuid(),
    Authorization: `Basic ${encryptUserCreds(username, password)}`,
  },
});

const plexUrlParams = (plexToken, user) => ({
  url: 'https://plex.tv/pms/servers.xml',
  headers: {
    'X-Plex-Client-Identifier': user.user.email,
    'X-Plex-Token': plexToken,
  },
});

const checkPlexPin = async (pinId, user) => {
  try {
    const params = {
      url: `https://plex.tv/pins/${pinId}.xml`,
      headers: {
        'X-Plex-Client-Identifier': user.googleId,
      },
    };
    const res = await request.get(params);
    const formattedResponse = JSON.parse(parser.toJson(res));
    return formattedResponse.pin.auth_token;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

const getPlexUrl = async (plexToken, user) => {
  try {
    const res = await request.get(plexUrlParams(plexToken, user));
    let formattedResponse = JSON.parse(parser.toJson(res))
      .MediaContainer.Server;

    if (!Array.isArray(formattedResponse)) {
      formattedResponse = [formattedResponse];
    }
    formattedResponse.reduce((acc, other) =>
      acc.createdAt > other.createdAt ? acc : other,
    );

    const server = formattedResponse.slice(-1)[0];

    await models.User.update(
      {
        plexToken: plexToken.trim(),
        plexUrl: `http://${server.address}:${server.port}`.trim(),
      },
      { where: { googleId: user.googleId } },
    );
    console.log('server--', server);
    return `http://${server.address}:${server.port}`;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

const rxAuthToken = /authenticationToken="([^"]+)"/;

const encryptUserCreds = (username, password) => {
  const creds = `${username}:${password}`;
  return btoa(creds);
};

export default { fetchToken, getPlexPin, checkPlexPin, getPlexUrl };
