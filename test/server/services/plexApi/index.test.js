import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import responses from './mocks/parsedResponses';
import app from '../../../../index';

nock.enableNetConnect;

chai.use(chaiHttp);
const should = chai.should();

describe('Students', () => {
  describe('GET /', async () => {
    // Test to get all students record
    it('should get all plex users', (done) => {
      const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
      nock('https://plex.tv')
        .get('/api/users?X-Plex-Token=hhnKQYskVjepfkhixqJu')
        .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

      chai
        .request(app)
        .get('/api/v1/plex/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    // Test to get single student record
    // it('should get a single student record', (done) => {
    //   const id = 1;
    //   chai
    //     .request(app)
    //     .get(`/${id}`)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       done();
    //     });
    // });

    // // Test to get single student record
    // it('should not get a single student record', (done) => {
    //   const id = 5;
    //   chai
    //     .request(app)
    //     .get(`/${id}`)
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //       done();
    //     });
    // });
  });
});
