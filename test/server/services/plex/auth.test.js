import chai from 'chai';
import * as nocks from '../../../nocks';
import app from '../../../../index';

describe('Users', () => {
  describe('GET /api/v1/plex/auth', async () => {
    it('should get plex auth token', done => {
      nocks.auth();

      chai
        .request(app)
        .get('/api/plex/auth')
        .query({username: 'username', password: 'password'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.equal('testPlexApiToken');
          done();
        });
    });
  });
});
