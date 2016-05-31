import _ from 'lodash';
import moment from 'moment';

import d from 'debug';
const debug = d('4me.flight.positions.fetch');

import {getDb} from './sql';

import {
  recoverStatus,
  escalateStatus,
} from './status';

export function getData(callsigns = []) {
  if(_.isEmpty(callsigns)) {
    return Promise.resolve([]);
  }

  const db = getDb();

  const cutOff = moment().subtract(process.env.POSITION_MAX_AGE, 'seconds').unix();

  console.log(db
    .select([
      'arcid as callsign',
      'lat',
      'lon as long',
      'modec as alt',
      'end_timestamp as when'
    ])
    .from(process.env.SQL_TABLE)
    .whereIn('arcid', callsigns)
    .where('end_timestamp', '>', cutOff)
    .toString()
  );

  return db
    .select([
      'arcid as callsign',
      'lat',
      'lon as long',
      'modec as alt',
      'end_timestamp as when'
    ])
    .from(process.env.SQL_TABLE)
    .whereIn('arcid', callsigns)
    .where('end_timestamp', '>', cutOff)
    .then(data => {
      debug(data);
      const r = _.map(data, r => {
        return Object.assign({}, r, {
          when: moment.unix(r.when).valueOf(),
          alt: parseInt(r.alt) * 100,
          lat: parseFloat(r.lat),
          long: parseFloat(r.long),
        });
      });

      return r;
    })
    .then(data => {
      recoverStatus();
      return data;
    })
    .catch(err => {
      debug(err);
      escalateStatus(_.get(err, 'message', 'Unknown error'), 'error');
      return [];
    })
}
