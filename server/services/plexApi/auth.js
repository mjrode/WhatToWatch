import uuid from 'uuid/v1';
import btoa from 'btoa';
import request from 'request-promise';

const rxAuthToken = /authenticationToken="([^"]+)"/;

const options = (username, password) => ({
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
  const res = await request.post(options(username, password));
  console.log(res);
  const token = res.match(rxAuthToken)[1];
  return token;
};

export default fetchToken;
