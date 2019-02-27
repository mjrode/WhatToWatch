import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import importData from '../../../../server/services/plex/importData';
import models from '../../../../server/db/models';
import { seed, truncate } from '../../../../server/db/scripts';
import * as nocks from '../../../nocks';

// // before(() => truncate('PlexSection'));
describe('ImportData', () => {
  before(() => {
    nocks.plexSections();
    seed('User');
  });
  after(() => {
    truncate('User');
    truncate('PlexLibrary');
    truncate('PlexSection');
  });

  describe('GET /plex/import/sections', () => {
    it('should find and store sections in the database', async () => {
      const response = await importData.importSections();
      console.log('import sec response', response);
      const sections = await models.PlexSection.findAll();
      console.log('Sections response', sections);
      sections.should.be.length(2);
    });
  });
});

// describe('createRecord', () => {
//   const name = 'testCreateIM';
//   const im = { name, description: 'new interface method' };
//   let jwt;

//   before((done) => {
//     createToken('test')
//       .then((token) => {
//         jwt = token;
//         done();
//       });
//   });

//   after(() => Interfacemethod.destroy({ where: { name } }));

//   it('creates record', (done) => {
//     let responseRecord;
//     chai.request(app)
//       .post('/v1/interfacemethods')
//       .set('Authorization', `Bearer ${jwt}`)
//       .send(im)
//       .then((res) => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.have.property('record');
//         responseRecord = res.body.record;
//         return Interfacemethod.findByPk(responseRecord.id);
//       })
//       .then((dbRecord) => {
//         expect(responseRecord).to.deep.equal(JSON.parse(JSON.stringify(dbRecord)));
//         expect(im.name).to.equal(responseRecord.name);
//         expect(im.description).to.equal(responseRecord.description);
//         done();
//       });
//   });
// });
