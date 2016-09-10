import startKnex from 'knex';
import d from 'debug';
const debug = d('4me.flight.positions.sql');

let knex;

export function initDb() {
  const credentials = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
  };

  if(!credentials.host) {
    throw new Error('Please provided a valid SQL_HOST env variable');
  }

  if(!credentials.database) {
    throw new Error('Please provide a valid SQL_DB env variable');
  }

  debug('Connecting to DB');


  knex = startKnex({
    client: 'mysql',
    connection: {
      ...credentials,
    },
    acquireConnectionTimeout: parseInt(process.env.SQL_TIMEOUT) || 1000,
  });


  return knex;
}

export function getDb() {
  if(!knex) {
    throw new Error('Connection to DB is not initialized !');
  }

  return knex;
}
