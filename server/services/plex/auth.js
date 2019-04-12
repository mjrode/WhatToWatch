import parser from 'xml2json';
import uuid from 'uuid';
import btoa from 'btoa';
import request from 'request-promise';

const rxAuthToken = /authenticationToken="([^"]+)"/;

const tokenUrlParams = (username, password) => ({
  url: 'https://plex.tv/users/sign_in.xml',
  headers: {
    'X-Plex-Client-Identifier': uuid(),
    Authorization: `Basic ${encryptUserCreds(username, password)}`,
  },
});

const encryptUserCreds = (username, password) => {
  const creds = `${username}:${password}`;
  return btoa(creds);
};

const fetchToken = async (username, password) => {
  try {
    const res = await request.post(tokenUrlParams(username, password));
    const token = res.match(rxAuthToken)[1];
    return token;
  } catch (error) {
    return error.message;
  }
};

const plexUrlParams = plexToken => ({
  url: 'https://plex.tv/pms/servers.xml',
  headers: {
    'X-Plex-Client-Identifier': uuid(),
    'X-Plex-Token': plexToken,
  },
});

const plexUrl = async plexToken => {
  try {
    const res = await request.get(plexUrlParams(plexToken));
    const formattedResponse = JSON.parse(parser.toJson(res));
    const server = formattedResponse.MediaContainer.Server.filter(
      server => server.port === '32400',
    );

    console.log(server);
    return `http://${server[0].address}:${server[0].port}`;
  } catch (error) {
    return error.message;
  }
};

export default {fetchToken, plexUrl};
