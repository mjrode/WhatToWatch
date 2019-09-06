import chai from 'chai';
import * as nocks from '../../nocks';
import app from '../../../index';
import passport from 'passport';
import tk from 'timekeeper';
import { seed, truncate } from '../../../server/db/scripts';
import models from './../../../server/db/models';

var expect = require('chai').expect;

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

  const userProfile = () => {
    return {
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
    };
  };

  const formatDbResponse = record => {
    return JSON.parse(JSON.stringify(record.get({ plain: true })));
  };

  describe('a request is made to GET /api/auth/google', () => {
    describe('and the user has not previously registered', () => {
      it('should not find the current user in the database before auth', async () => {
        const dbUser = await models.User.findOne({
          where: { email: 'michaelrode44@gmail.com' },
        });
        expect(dbUser).to.be.null;
      });

      describe('When a user successfully auths with google', () => {
        it('should create a new user record in the database and return the user record', done => {
          let strategy = passport._strategies['google'];

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
              res.body.should.deep.equal(userProfile());
              done();
            });
        });
        it('should fail to create a new user record in the database if passed invalid information', done => {
          let strategy = passport._strategies['google'];

          strategy._token_response = {
            access_token: 'at-1234',
            expires_in: 3600,
          };

          strategy._profile = {
            displayName: 'Michael Rode',
            name: { familyName: 'Rode', givenName: 'Michael' },
            emails: [
              { value: 'michaelrod@gmail.com', verified: true },
            ],
            provider: 'google',
          };

          chai
            .request(app)
            .get('/api/auth/google')
            .then(res => {
              res.statusCode.should.equal(500);
              res.text.should.equal(
                "Cannot read property 'id' of undefined",
              );
              done();
            });
        });

        it('should find the current user in the database after auth', async () => {
          const dbUser = await models.User.findOne({
            where: { email: 'michaelrode44@gmail.com' },
          });
          const jsonUser = formatDbResponse(dbUser);
          delete jsonUser.id;
          jsonUser.should.deep.equal(userProfile());
        });
      });
    });
  });

  describe('GET /api/auth/sign-up', async () => {
    it('should not find the current user in the database before auth', async () => {
      const dbUser = await models.User.findOne({
        where: { email: 'michaelrode@gmail.com' },
      });
      expect(dbUser).to.be.null;
    });

    describe('When a user successfully auths with google', () => {
      describe('and the user has not previously registered', () => {
        it('should create a new user record in the database and return the user record', done => {
          const localUserProfile = () => {
            return {
              firstName: null,
              lastName: null,
              email: 'mike.rodde@gmail.com',
              googleId: null,
              updatedAt: '2012-03-02T11:38:49.321Z',
              createdAt: '2012-03-02T11:38:49.321Z',
              plexUrl: null,
              plexToken: null,
              plexPinId: null,
              sonarrUrl: null,
              sonarrApiKey: null,
              admin: null,
            };
          };
          chai
            .request(app)
            .post('/api/auth/sign-up')
            .send({
              email: 'mike.rodde@gmail.com',
              password: 'password',
            })
            .end((err, res) => {
              res.should.have.status(200);
              delete res.body.id;
              delete res.body.password;
              res.body.should.deep.equal(localUserProfile());
              done();
            });
        });

        it('should fail to create a new user record in the database when missing required params', done => {
          chai
            .request(app)
            .post('/api/auth/sign-up')
            .send({
              email: 'mike.rodde@gmail.com',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.message.should.equal('Missing credentials');
              done();
            });
        });
        it('should handle and error returned from the server', done => {
          chai
            .request(app)
            .post('/api/auth/sign-up')
            .send({
              email: 'mike.rodde@gmail.com',
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.message.should.equal('Missing credentials');
              done();
            });
        });
      });
    });
  });
});
