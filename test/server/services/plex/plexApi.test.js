import plexResponses from '../../../mocks/plexResponses';
import plexApi from '../../../../server/services/plex/plexApi';
import helpers from '../../../../server/services/helpers';
import * as nocks from '../../../nocks';

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

  it('handles error when building url', () => {
    const urlParams = 'invalid params';
    const url = helpers.buildUrl(urlParams);
    url.message.should.equal('Invalid urlParams: invalid params');
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

  it('returns library data by sectionId', async () => {
    nocks.plexLibrary();
    const result = await plexApi.getLibraryDataBySection({ sectionId: 2 });
    result.should.deep.equal(
      plexResponses.getLibraryDataBySectionRaw.MediaContainer.Metadata,
    );
  });

  // it.only('handles error if passed incorrect parameters', async (done) => {
  //   try {
  //     await plexApi.getLibraryDataBySection('incorrect param');
  //   } catch (error) {
  //     console.log('CAUGHTEM', error);
  //     error.code.should.equal(401);
  //     error.message.should.equal('Unauthorized');
  //     error.code.should.equal(
  //       'https://plex.mjrflix.com/library/sections/undefined/all?X-Plex-Token=testPlexApiToken',
  //     );
  //   }
  // });
});
