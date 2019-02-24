import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';

describe('Users', () => {
  describe('GET /api/v1/plex/auth', async () => {
    it('should get plex auth token', (done) => {
      const response = `${__dirname}/mocks/authResponse.xml`;
      nock('https://plex.tv')
        .post(uri => uri.includes('/users/sign_in.xml'))
        .replyWithFile(200, response, {
          'Content-Type': 'text/xml',
        });

      chai
        .request(app)
        .get('/plex/auth')
        .query({ username: 'username', password: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.equal('testPlexApiToken');
          done();
        });
    });
  });
});
