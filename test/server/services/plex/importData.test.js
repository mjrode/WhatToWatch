import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import responses from './mocks/plexResponses';
import { PlexSection, User, PlexLibrary } from '../../../../server/db/models';
import { seed, truncate } from '../../../../server/db/scripts';

// before(() => truncate('PlexSection'));
describe('ImportData', () => {
  before(() => {
    seed('User');
  });
  describe('GET /plex/import/sections', async () => {
    it('should find and store sections in the database first', async () => {
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });

      const response = await chai.request(app).get('/plex/import/sections');
      response.should.have.status(200);
      const sections = await PlexSection.findAll();
      sections.should.be.length(2);
    });
  });

  describe('Get /plex/import/libraries', async () => {
    it('should sections', async () => {
      nock('https://plex.mjrflix.com')
        .get(url => url.includes('/library/sections/3'))
        .reply(200, responses.getLibraryDataBySectionRaw, {
          'Content-Type': 'text/json',
        });
      nock('https://plex.mjrflix.com')
        .get(url => url.includes('/library/sections/2'))
        .reply(200, responses.getLibraryDataBySectionRaw, {
          'Content-Type': 'text/json',
        });
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });
      const response = await chai.request(app).get('/plex/import/libraries');
      const media = await PlexLibrary.findAll();
      media.should.be.length(56);
    });
  });
});
