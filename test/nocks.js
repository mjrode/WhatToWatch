import nock from 'nock';
import responses from './server/services/plex/mocks/plexResponses';

const usersResponse = `${__dirname}/server/services/plex/mocks/getUsersResponse.xml`;
const authResponse = `${__dirname}/server/services/plex/mocks/authResponse.xml`;

export const plexSections = () => {
  nock('https://plex.mjrflix.com')
    .get('/library/sections?X-Plex-Token=testPlexApiToken')
    .reply(200, responses.sectionsRaw, {
      'Content-Type': 'text/json',
    });
};

export const plexLibrary = () => {
  nock('https://plex.mjrflix.com')
    .persist()
    .get(url => url.includes('/library/sections/'))
    .reply(200, responses.getLibraryDataBySectionRaw, {
      'Content-Type': 'text/json',
    });
};

export const plexUsers = () => {
  nock('https://plex.tv')
    .get('/api/users?X-Plex-Token=testPlexApiToken')
    .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });
};

export const mostWatched = () => {
  nock('https://plex.mjrflix.com')
    .get('/library/all/top?type=2&limit=10&X-Plex-Token=testPlexApiToken')
    .reply(200, responses.mostWatchedRaw, {
      'Content-Type': 'text/json',
    });
};

export const mostWatchedByAccount = () => {
  nock('https://plex.mjrflix.com')
    .get(
      '/library/all/top?accountID=22099864&type=2&limit=10&X-Plex-Token=testPlexApiToken',
    )
    .reply(200, responses.mostWatchedByAccountRaw, {
      'Content-Type': 'text/json',
    });
};

export const auth = () => {
  nock('https://plex.tv')
    .post(uri => uri.includes('/users/sign_in.xml'))
    .replyWithFile(200, authResponse, {
      'Content-Type': 'text/xml',
    });
};
