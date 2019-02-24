import nock from 'nock';
import responses from './server/services/plex/mocks/plexResponses';

const usersResponse = `${__dirname}/server/services/plex/mocks/getUsersResponse.xml`;

const plexSections = () => nock('https://plex.mjrflix.com')
  .get('/library/sections?X-Plex-Token=testPlexApiToken')
  .reply(200, responses.sections, {
    'Content-Type': 'text/json',
  });

const plexLibrary = () => nock('https://plex.mjrflix.com')
  .persist()
  .get(url => url.includes('/library/sections/'))
  .reply(200, responses.getLibraryDataBySectionRaw, {
    'Content-Type': 'text/json',
  });

const plexUsers = () => nock('https://plex.tv')
  .get('/api/users?X-Plex-Token=testPlexApiToken')
  .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

export default { plexSections, plexLibrary, plexUsers };
