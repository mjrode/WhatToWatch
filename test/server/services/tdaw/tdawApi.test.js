import nock from 'nock';
// import plexResponses from './mocks/plexResponses';
import tdawApi from '../../../../server/services/tdaw/tdawApi';
import helpers from '../../../../server/services/helpers';
import * as nocks from '../../../nocks';

describe('tdawApi', () => {
  it('return tdaw url object', () => {
    const result = tdawApi.mediaUrl('New Girl', 'show');
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
  const urlParams = tdawApi.mediaUrl('New Girl', 'show');
  const url = helpers.buildUrl(urlParams);
  url.should.equal(
    'https://tastedive.com/api/similar?q=New%20Girl&k=testTdawToken&info=1&type=show',
  );
});
