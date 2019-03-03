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
      queryParams: {
        type: 'show',
        info: 1,
        k: 'testTdawToken',
        q: 'New Girl',
      },
    });
  });
});

it('returns url', () => {
  const urlParams = tdawApi.mediaUrl('New Girl');
  const url = helpers.buildUrl(urlParams);
  url.should.equal(
    'https://tastedive.com/api/similar?q=new+girl%2C+the+office&k=329666-mjrflix-OO8GSDR7&info=1&type=show',
  );
});
