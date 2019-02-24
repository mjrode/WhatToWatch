import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import responses from './mocks/plexResponses';
import { PlexSection, User, PlexLibrary } from '../../../../server/models';
import truncate from '../../../truncate';

before(() => truncate('PlexSection'));
describe('ImportData', () => {
  // beforeEach(() => {
  //   User.create({
  //     firstName: 'Mike',
  //     lastName: 'Rode',
  //     email: 'michaelrode44@gmail.com',
  //   });
  // });
  describe('GET /plex/import/sections', async () => {
    it('should find and store sections in the database first', (done) => {
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });

      chai
        .request(app)
        .get('/plex/import/sections')
        .then((err, res) => {
          PlexSection.findAll().then((sections) => {
            sections.should.be.a('array');
            sections.should.have.length(2);
          });
          done();
        })
        .catch(done);
    });

    it('should find and store sections in the database second', (done) => {
      nock('https://plex.mjrflix.com')
        .get('/library/sections?X-Plex-Token=testPlexApiToken')
        .reply(200, responses.sectionsRaw, {
          'Content-Type': 'text/json',
        });

      chai
        .request(app)
        .get('/plex/import/sections')
        .then((err, res) => {
          PlexSection.findAll().then((sections) => {
            sections.should.be.a('array');
            sections.should.have.length(2);
          });
          done();
        })
        .catch(done);
    });
  });

  describe('Get /plex/import/libraries', async () => {
    it('should sections', (done) => {
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
      chai
        .request(app)
        .get('/plex/import/libraries')
        .then((err, res) => {
          PlexLibrary.findAll().then((media) => {
            media.should.be.a('array');
            // console.log('mikes-media', media);
            done();
          });
        });
    });
  });
});
