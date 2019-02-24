import nock from 'nock';
import plexResponses from './mocks/plexResponses';
import plexApi from '../../../../server/services/plex/plexApi';
import helpers from '../../../../server/services/plex/helpers';
import nocks from '../../../nocks';

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
    const urlParams = plexApi.getUsersUrlParams();
    const url = helpers.buildUrl(urlParams);
    url.should.equal('https://plex.tv/api/users?X-Plex-Token=testPlexApiToken');
  });

  it('returns users', async () => {
    nocks.plexUsers();

    const urlParams = plexApi.getUsersUrlParams();
    const url = helpers.buildUrl(urlParams);
    const result = await helpers.request(url);
    result.should.deep.equal(plexResponses.getUsersRaw);
  });

  it('returns users using getUsers', async () => {
    nocks.plexUsers();

    const result = await plexApi.getUsers();
    result.should.deep.equal(plexResponses.getUsersParsed);
  });
});
