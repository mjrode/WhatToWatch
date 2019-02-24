// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import nock from 'nock';
// import sinon from 'sinon';
// import responses from './mocks/plexResponses';
// import app from '../../../../index';

// chai.use(chaiHttp);
// const should = chai.should();
// describe('Users', () => {
//   describe('GET /api/v1/plex/auth', async () => {
//     it('should get plex auth token', (done) => {
//       const response = `${__dirname}/mocks/authResponse.xml`;
//       nock('https://plex.tv')
//         .post(uri => uri.includes('/users/sign_in.xml'))
//         .replyWithFile(200, response, {
//           'Content-Type': 'text/xml',
//         });

//       chai
//         .request(app)
//         .get('/api/v1/plex/auth')
//         .query({ username: 'username', password: 'password' })
//         .end((err, res) => {
//           console.log('mike', res.body);
//           res.should.have.status(200);
//           res.body.should.equal('testPlexApiToken');
//           done();
//         });
//     });
//   });
// });
