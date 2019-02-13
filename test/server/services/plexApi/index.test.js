import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import responses from './mocks/parsedResponses';
import app from '../../../../index';

nock.enableNetConnect;

chai.use(chaiHttp);
const should = chai.should();

describe('Users', () => {
  describe('GET /api/v1/plex/users', async () => {
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
          res.body.should.be.a('array');
          res.body.should.deep.equal(responses.getUsersParsed);
          done();
        });
    });
  });
});
