import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import PlexApiClient from '../../../../server/services/plexApi/index';

console.log('mike', new PlexApiClient({ token: 'token' }));
const should = chai.should();

describe('plexApi', () => {
  it('sets options when passed valid options object', () => {
    const options = { plexToken: 'plexToken' };
    const result = new PlexApiClient(options).options;
    result.should.deep.equal({
      plexToken: 'plexToken',
    });
  });
});
