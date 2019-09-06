import chai from 'chai';
import * as nocks from '../../nocks';
import app from '../../../index';
import passport from 'passport';
import tk from 'timekeeper';
import { seed, truncate } from '../../../server/db/scripts';

describe('auth.controller', () => {
  before(async () => {
    tk.freeze(new Date(1330688329321));
    await truncate('User');
    await truncate('PlexLibrary');
    await truncate('PlexSection');
    await seed('User', 'Users');
    await seed('PlexSection');
    await seed('PlexSection', 'PlexSections');
    await seed('PlexLibrary');
  });

  after(() => {
    tk.reset();
  });

  describe('GET /api/auth/current_user', async () => {
    describe('When there is no user present in the session', () => {
      it('should return null', done => {
        chai
          .request(app)
          .get('/api/auth/current_user')
          .end((err, res) => {
            console.log('resbody', res.body);
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
          });
      });
    });
  });

  describe('GET /api/auth/google', async () => {
    describe('When a user successfully auths with google', () => {
      it.only('should create and return a user', done => {
        let strategy = passport._strategies['google'];
        console.log('strats--', passport._strategies);

        strategy._token_response = {
          access_token: 'at-1234',
          expires_in: 3600,
        };

        strategy._profile = {
          id: '103913097386807680151',
          displayName: 'Michael Rode',
          name: { familyName: 'Rode', givenName: 'Michael' },
          emails: [
            { value: 'michaelrode44@gmail.com', verified: true },
          ],
          provider: 'google',
        };

        chai
          .request(app)
          .get('/api/auth/google')
          .end((err, res) => {
            res.should.have.status(200);
            delete res.body.id;
            res.body.should.deep.equal({
              firstName: 'Michael',
              lastName: 'Rode',
              email: 'michaelrode44@gmail.com',
              googleId: '103913097386807680151',
              updatedAt: '2012-03-02T11:38:49.321Z',
              createdAt: '2012-03-02T11:38:49.321Z',
              plexUrl: null,
              plexToken: null,
              plexPinId: null,
              sonarrUrl: null,
              sonarrApiKey: null,
              admin: null,
              password: null,
            });
            done();
          });
      });
    });
  });
});
