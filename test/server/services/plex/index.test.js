import chai from 'chai';
import chaiHttp from 'chai-http';
import * as nocks from '../../../nocks';
import responses from '../../../mocks/plexResponses';
import app from '../../../../index';

chai.use(chaiHttp);
const should = chai.should();

describe('Users', () => {
  describe('GET plex/users', async () => {
    it('should get all plex users', (done) => {
      nocks.plexUsers();

      chai
        .request(app)
        .get('/plex/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.deep.equal(responses.getUsersParsed);
          done();
        });
    });
  });
});

describe('Most Watched', () => {
  describe('GET plex/most-watched?:sectionKey', async () => {
    it('should return most watched history', (done) => {
      nocks.mostWatched();

      chai
        .request(app)
        .get('/plex/most-watched?sectionKey=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.deep.equal(responses.mostWatchedParsedTV);
          done();
        });
    });
  });

  describe('GET plex/most-watched?:accountId&:sectionKey', async () => {
    it('should return most watched history per account', (done) => {
      nocks.mostWatchedByAccount();

      chai
        .request(app)
        .get('/plex/most-watched?accountId=22099864&sectionKey=2')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.deep.equal(responses.mostWatchedByAccountParsed);
          done();
        });
    });
  });
});

describe('Sections', () => {
  describe('GET plex/sections', async () => {
    it('should get sections', (done) => {
      nocks.plexSections();
      chai
        .request(app)
        .get('/plex/sections')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.deep.equal(responses.sectionsParsed);
          done();
        });
    });
  });
});

describe('Library Data', () => {
  describe('GET plex/library?sectionId=3', async () => {
    it('should fetch library', (done) => {
      nocks.plexLibrary();
      chai
        .request(app)
        .get('/plex/library/3')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.deep.equal(
            responses.getLibraryDataBySectionRaw.MediaContainer.Metadata,
          );
          done();
        });
    });
  });

  describe('GET plex/library?sectionId=3', async () => {
    it('should return error upon failure', (done) => {
      nocks.invalidRequest();
      chai
        .request(app)
        .get('/api/users?X-Plex-Token')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
