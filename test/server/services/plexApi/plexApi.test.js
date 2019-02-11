import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import PlexApiClient from '../../../../server/services/plexApi/index';
import plexApi from '../../../../server/services/plexApi/index';

const should = chai.should();

describe('plexApi', () => {
  it('sets options when passed valid options object', () => {
    const options = { token: 'plexToken' };
    const result = new PlexApiClient(options).options;
    result.should.deep.equal({
      token: 'plexToken',
    });
  });

  it('return url params object', () => {
    const options = { token: 'plexToken' };
    const result = new PlexApiClient(options).getUsersUrlParams();
    result.should.deep.equal({
      host: 'https://plex.tv',
      path: '/api/users',
      queryParams: {
        'X-Plex-Token': 'plexToken',
      },
    });
  });

  it('returns url', () => {
    const options = { token: 'plexToken' };
    const PlexApi = new PlexApiClient(options);
    console.log(PlexApi);
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    url.should.equal('https://plex.tv/api/users?X-Plex-Token=plexToken');
  });
});
