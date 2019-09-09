import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import passport from 'passport';
import tk from 'timekeeper';
import * as nocks from '../../nocks';
import app from '../../../index';
import { seed, truncate } from '../../../server/db/scripts';
import models from './../../../server/db/models';
import * as testHelpers from '../helpers';
const bCrypt = require('bcrypt-nodejs');

var expect = require('chai').expect;

const generateHash = password => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
};

const createUserWithNoPin = () => {
  return models.User.create({
    email: 'testuser@email.com',
    password: generateHash('password'),
  });
};

describe('plex.controller', () => {
  beforeEach(async () => {
    await truncate('User');
    await truncate('PlexLibrary');
    await truncate('PlexSection');
  });
  describe('a request is made to GET /api/plex/plex-pin', () => {
    describe('there is a valid user in the session', () => {
      it.only('should return a plexPinId', async () => {
        nocks.plexPin();
        await createUserWithNoPin();
        const authorizedAgent = await testHelpers.authorizedAgent(
          'testuser@email.com',
        );

        const res = await authorizedAgent.get('/api/plex/plex-pin');

        console.log('res plex pin', res.body);
        res.should.have.status(200);
        res.body.should.equal('CX56');
      });
    });
  });
});
