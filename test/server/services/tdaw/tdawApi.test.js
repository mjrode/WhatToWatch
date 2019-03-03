import nock from 'nock';
// import plexResponses from './mocks/plexResponses';
import tdawApi from '../../../../server/services/tdaw/tdawApi';
import helpers from '../../../../server/services/helpers';
import * as nocks from '../../../nocks';

describe('tdawApi', () => {
  it('return tdaw url object', () => {
    const result = tdawApi.mediaUrl('New Girl');
    result.should.deep.equal({
      host: 'https://tastedive.com/api/similar',
      path: '?',
      queryParams: {
        type: 'show',
        info: 1,
        k: 'testTdawToken',
        q: 'New Girl',
      },
    });
  });
});

// it('returns url', () => {
//   const urlParams = plexApi.getUsersUrlParams();
//   const url = helpers.buildUrl(urlParams);
//   url.should.equal('https://plex.tv/api/users?X-Plex-Token=testPlexApiToken');
// });
