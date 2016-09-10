import request from 'supertest';
import nock from 'nock';
import app from '../../index';

import {getTracker} from 'mock-knex';

describe('spec 8.2', () => {
  const tracker = getTracker();

  beforeEach(() => {
    process.env.POSITION_MAX_AGE = 3600*24*365*20; // 20 years

    tracker.install();
    tracker.on('query', query => {
      query.response([{
        callsign: 'ABC123',
        lat: 49.2534,
        long: 4.033,
        alt: 340,
        when: Math.floor(new Date("Sat, 10 Sep 2016 16:05:11 GMT") / 1000),
      }]);
    })
  });

  afterEach(() => {
    tracker.uninstall();
    delete process.env.POSITION_MAX_AGE;
  });

  test('present SQL data in JSON format and produce a valid output', () => {
    return request(app)
      .get('/?callsigns[]=ABC123')
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toMatchSnapshot();
      });
  });
});
