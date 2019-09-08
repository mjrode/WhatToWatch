import chai from 'chai';
import sinon from 'sinon';
import passport from 'passport';
import tk from 'timekeeper';
import * as nocks from '../../nocks';
import app from '../../../index';
import { seed, truncate } from '../../../server/db/scripts';
import models from './../../../server/db/models';

var expect = require('chai').expect;

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

const fetchUserAndFormat = email => {
  return models.User.findOne({
    where: { email },
  }).then(user => {
    const formattedUser = formatDbResponse(user);
    delete formattedUser.id;
    return formattedUser;
  });
};

const formatDbResponse = record => {
  const user = JSON.parse(
    JSON.stringify(record.get({ plain: true, raw: true })),
  );
  delete user.id;
  return user;
};

const tokenResponse = {
  access_token: 'at-1234',
  expires_in: 3600,
};

const googleProfile = email => {
  return {
    id: '103913097386807680151',
    displayName: 'Michael Rode',
    name: { familyName: 'Rode', givenName: 'Michael' },
    emails: [{ value: email, verified: true }],
    provider: 'google',
  };
};

const setMockGoogleStrategy = email => {
  let strategy = passport._strategies['google'];

  strategy._token_response = tokenResponse;
  strategy._profile = googleProfile(email);
};

describe.only('auth.controller', () => {
  beforeEach(async () => {
    await truncate('User');
    await truncate('PlexLibrary');
    await truncate('PlexSection');
  });
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

  describe('when there is no user present in the session', () => {
    describe('a request is made to GET /api/auth/current_user', () => {
      it('should return null', done => {
        chai
          .request(app)
          .get('/api/auth/current_user')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.empty;
            done();
          });
      });
    });
  });

  describe('a request is made to GET /api/auth/google', () => {
    describe('and the user has not previously registered', () => {
      it('should not find the current user in the database before auth', async () => {
        const dbUser = await models.User.findOne({
          where: { email: 'michaelrode44@gmail.com' },
        });
        expect(dbUser).to.be.null;
        const usersCount = await models.User.count();
        expect(usersCount).to.equal(0);
      });

      describe('When a user successfully auths with google', () => {
        it('should create a new user record in the database and return the user record', async () => {
          console.log('Was I called----');

          const usersCountBefore = await models.User.count();
          expect(usersCountBefore).to.equal(0);

          setMockGoogleStrategy('michaelrode44@gmail.com');

          const res = await chai
            .request(app)
            .get('/api/auth/google')
            .redirects(1);

          res.should.have.status(302);
          expect(res.headers.location).to.equal(
            '/plex-pin/?email=michaelrode44@gmail.com',
          );

          const usersCountAfter = await models.User.count();
          expect(usersCountAfter).to.equal(1);
        });
      });
    });

    describe('when the user already exists in the database', () => {
      it('user count should not change', async () => {
        await models.User.create({
          email: 'michaelrode44@gmail.com',
          password: 'password',
        });
        const usersCountBefore = await models.User.count();
        expect(usersCountBefore).to.equal(1);

        setMockGoogleStrategy('michaelrode44@gmail.com');

        const res = await chai
          .request(app)
          .get('/api/auth/google')
          .redirects(1);

        res.should.have.status(302);
        expect(res.headers.location).to.equal(
          '/plex-pin/?email=michaelrode44@gmail.com',
        );

        const usersCountAfter = await models.User.count();
        expect(usersCountAfter).to.equal(1);
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

    describe('When a user successfully auths with local strategy', () => {
      describe('and the user has not previously registered', () => {
        it.only('should create a new user record in the database and return the user record', async () => {
          const usersCountBefore = await models.User.count();
          expect(usersCountBefore).to.equal(0);
          const res = await chai
            .request(app)
            .post('/api/auth/sign-up')
            .send({
              email: 'mike.rodde@gmail.com',
              password: 'password',
            })
            .redirects(1);
          console.log('res', res.status);
          console.log('res', res.text);
          console.log('res', res.message);
          console.log('res', res.headers);
          res.should.have.status(302);
          expect(res.headers.location).to.equal(
            '/plex-pin/?email=mike.rodde@gmail.com',
          );

          const usersCountAfter = await models.User.count();
          expect(usersCountAfter).to.equal(1);
        });
      });
      describe('when a user fails to auth with local strategy', () => {
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
      });
    });
  });
});
