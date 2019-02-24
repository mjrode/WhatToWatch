import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import plexResponses from './mocks/plexResponses';
import plexApi from '../../../../server/services/plex/plexApi';

const should = chai.should();

describe('plexApi', () => {
  it('return url params object', () => {
    const result = plexApi.getUsersUrlParams();
    result.should.deep.equal({
      host: 'https://plex.tv/api',
      path: '/users',
      queryParams: {
        'X-Plex-Token': 'testPlexApiToken',
      },
    });
  });

  it('returns url', () => {
    const PlexApi = plexApi;
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    url.should.equal('https://plex.tv/api/users?X-Plex-Token=testPlexApiToken');
  });

  it('returns users', async () => {
    const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
    nock('https://plex.tv')
      .get('/api/users?X-Plex-Token=testPlexApiToken')
      .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

    const PlexApi = plexApi;
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    const result = await PlexApi.request(url);
    result.should.deep.equal(plexResponses.getUsersRaw);
  });

  it('returns users using getUsers', async () => {
    const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
    nock('https://plex.tv')
      .get('/api/users?X-Plex-Token=testPlexApiToken')
      .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

    const PlexApi = plexApi;
    const result = await PlexApi.getUsers();
    result.should.deep.equal(plexResponses.getUsersParsed);
  });
});
