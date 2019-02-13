import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import nock from 'nock';
import parsedResponses from './mocks/parsedResponses';
import plexApiClient from '../../../../server/services/plexApi/plexApi';

nock.enableNetConnect;

const should = chai.should();

describe('plexApi', () => {
  it('sets options when passed valid options object', () => {
    const options = { token: 'plexToken' };
    const result = plexApiClient(options).options;
    result.should.deep.equal({
      token: 'plexToken',
    });
  });

  it('return url params object', () => {
    const options = { token: 'plexToken' };
    const result = plexApiClient(options).getUsersUrlParams();
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
    const PlexApi = plexApiClient(options);
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    url.should.equal('https://plex.tv/api/users?X-Plex-Token=plexToken');
  });

  it('returns users', async () => {
    const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
    nock('https://plex.tv')
      .get('/api/users?X-Plex-Token=plexToken')
      .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

    const options = { token: 'plexToken' };
    const PlexApi = plexApiClient(options);
    const urlParams = PlexApi.getUsersUrlParams();
    const url = PlexApi.buildUrl(urlParams);
    const result = await PlexApi.request(url);
    result.should.deep.equal(parsedResponses.getUsers);
  });

  it('returns users using getUsers', async () => {
    const usersResponse = `${__dirname}/mocks/getUsersResponse.xml`;
    nock('https://plex.tv')
      .get('/api/users?X-Plex-Token=plexToken')
      .replyWithFile(200, usersResponse, { 'Content-Type': 'text/xml' });

    const options = { token: 'plexToken' };
    const PlexApi = plexApiClient(options);
    const result = await PlexApi.getUsers();
    result.should.deep.equal(parsedResponses.getUsers);
  });
});
