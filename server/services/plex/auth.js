import uuid from 'uuid';
import btoa from 'btoa';
import request from 'request-promise';

const rxAuthToken = /authenticationToken="([^"]+)"/;

const urlParams = (username, password) => ({
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
    const res = await request.post(urlParams(username, password));
    const token = res.match(rxAuthToken)[1];
    return token;
  } catch (error) {
    return error.message;
  }
};

export default fetchToken;
