// import chai from 'chai';
// import nock from 'nock';
// import app from '../../../../index';
// import { PlexSection, User, PlexLibrary } from '../../../../server/db/models';
// import { seed, truncate } from '../../../../server/db/scripts';
// import nocks from '../../../nocks';

// // before(() => truncate('PlexSection'));
// describe('ImportData', () => {
//   before(() => seed('User'));
//   after(() => {
//     truncate('User');
//     truncate('PlexLibrary');
//     truncate('PlexSection');
//   });

//   describe('GET /plex/import/sections', async () => {
//     it('should find and store sections in the database first', async () => {
//       nocks.plexSections();

//       const response = await chai.request(app).get('/plex/import/sections');
//       response.should.have.status(200);
//       const sections = await PlexSection.findAll();
//       sections.should.be.length(2);
//     });
//   });

//   describe('Get /plex/import/libraries', async () => {
//     it('should import sections', async () => {
//       nocks.plexLibrary();
//       nocks.plexSections();
//       await chai.request(app).get('/plex/import/libraries');
//       const media = await PlexLibrary.findAll();
//       media.should.be.length(56);
//     });
//   });
// });
