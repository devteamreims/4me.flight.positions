import request from 'supertest';
import nock from 'nock';
import app from '../../index';

test('have a /status route', () => {
  return request(app)
    .get('/status')
    .expect(200)
    .expect(res => {
      expect(res.body.version).toBeDefined();
    });
});
