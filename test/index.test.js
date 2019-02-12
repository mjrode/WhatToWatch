import request from 'supertest';
import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

describe('GET /api/v1/plex/users', () => {
  it('responds with json', (done) => {
    request(app)
      .get('/api/v1/plex/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
