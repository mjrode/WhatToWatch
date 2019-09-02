import nock from 'nock';
import plexResponses from './mocks/plexResponses';
import tdawResponses from './mocks/tdawResponses';

const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
const authResponse = `${__dirname}/mocks/authResponse.xml`;
const invalidRequestResponse = `${__dirname}/mocks/error.html`;

export const plexSections = () => {
  nock('https://plex.mjrflix.com')
    .get('/library/sections?X-Plex-Token=testPlexApiToken')
    .reply(200, plexResponses.sectionsRaw, {
      'Content-Type': 'text/json',
    });
};

export const plexLibrary = () =>
  nock('https://plex.mjrflix.com')
    .persist()
    .get(url => url.includes('/library/sections/3'))
    .reply(200, plexResponses.getLibraryDataBySectionRaw, {
      'Content-Type': 'text/json',
    });

export const plexUsers = () => {
  nock('https://plex.tv')
    .get('/api/users?X-Plex-Token=testPlexApiToken')
    .replyWithFile(200, usersResponse, {'Content-Type': 'text/xml'});
};

export const mostWatched = () => {
  nock('https://plex.mjrflix.com')
    .persist()
    .get(uri => uri.includes('/library/all/top?type='))
    .reply(200, plexResponses.mostWatchedRawTV, {
      'Content-Type': 'text/json',
    });
};

export const newGirlTdaw = () => {
  nock('https://tastedive.com/api/similar')
    .get(uri => uri.includes('New'))
    .reply(200, tdawResponses.newGirl, {
      'Content-Type': 'text/json',
    });
};

export const mostWatchedByAccount = () => {
  nock('https://plex.mjrflix.com')
    .get(
      '/library/all/top?accountId=22099864&type=2&limit=10&X-Plex-Token=testPlexApiToken',
    )
    .reply(200, plexResponses.mostWatchedByAccountRaw, {
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

export const invalidRequest = () => {
  nock('https://plex.mjrflix.com')
    .get(uri => uri.includes('users'))
    .replyWithFile(200, invalidRequestResponse, {
      'Content-Type': 'text/xml',
    });
};
