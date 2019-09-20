import chai from 'chai';
import * as nocks from '../../../nocks';
import app from '../../../../index';

describe('Users', () => {
  describe('GET /api/plex/auth', async () => {
    it('should get plex auth token', done => {
      nocks.auth();

      chai
        .request(app)
        .get('/api/plex/token')
        .query({
          username: 'username',
          password: 'password',
          plexUrl: 'plexserver.com',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.equal('testPlexApiToken');
          done();
        });
    });
  });
});
