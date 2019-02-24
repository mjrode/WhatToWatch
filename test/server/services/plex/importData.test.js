// import chai from 'chai';
// import nock from 'nock';
// import app from '../../../../index';
// import responses from './mocks/plexResponses';

// describe('Users', () => {
//   describe('GET /plex/import/sections', async () => {
//     it('should find and store sections in the database', (done) => {
//       nock('https://plex.mjrflix.com')
//         .get('/library/sections?X-Plex-Token=testPlexApiToken')
//         .reply(200, responses.sectionsRaw, {
//           'Content-Type': 'text/json',
//         });

//       chai
//         .request(app)
//         .get('/plex/import/sections')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.equal('testPlexApiToken');
//           done();
//         });
//     });
//   });
// });
