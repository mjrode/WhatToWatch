import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import responses from './mocks/plexResponses';
import { PlexSection, User } from '../../../../server/models';
import truncate from '../../../truncate';

// before(() => truncate('PlexSection'));
describe('ImportData', () => {
  beforeEach(() => {
    User.create({
      firstName: 'Mike',
      lastName: 'Rode',
      email: 'michaelrode44@gmail.com',
    });
  });
  describe('GET /plex/import/sections', async () => {
    it('should find and store sections in the database', (done) => {
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });

      chai
        .request(app)
        .get('/plex/import/sections')
        .then(() => PlexSection.findAll().then((sections) => {
          console.log('Sections 1', sections);
          sections.should.be.a('array');
          sections.should.have.length(2);
          done();
        }))
        .catch(done);
    });

    it('should find and store sections in the database', (done) => {
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });

      chai
        .request(app)
        .get('/plex/import/sections')
        .then(() => PlexSection.findAll().then((sections) => {
          console.log('Sections 2', sections);
          sections.should.be.a('array');
          sections.should.have.length(2);
          done();
        }))
        .catch(done);
    });
  });
});
