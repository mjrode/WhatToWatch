import nock from 'nock';
import tdawResponses from '../../../mocks/tdawResponses';
import tdawApi from '../../../../server/services/tdaw/tdawApi';
import helpers from '../../../../server/services/helpers';
import * as nocks from '../../../nocks';

describe('tdawApi', () => {
  it('return tdaw url object', () => {
    const result = tdawApi.tdawMediaUrl('New Girl', 'show');
    result.should.deep.equal({
      host: 'https://tastedive.com/api/similar',
      queryParams: {
        mediaType: 'show',
        info: 1,
        k: 'testTdawToken',
        q: 'New Girl',
      },
    });
  });

  it('returns url', () => {
    const urlParams = tdawApi.tdawMediaUrl('New Girl', 'show');
    const url = helpers.buildUrl(urlParams);
    url.should.equal(
      'https://tastedive.com/api/similar?q=New%20Girl&k=testTdawToken&info=1&mediaType=show',
    );
  });

  it('returns similar shows to new girl', async () => {
    nocks.newGirlTdaw();

    const urlParams = tdawApi.tdawMediaUrl('New Girl', 'show');
    const url = helpers.buildUrl(urlParams);
    const result = await helpers.request(url);
    result.should.deep.equal(tdawResponses.newGirl);
  });
});
