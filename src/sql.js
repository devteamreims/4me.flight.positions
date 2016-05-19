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

  debug('Connecting to DB');

  knex = startKnex({
    client: 'mysql',
    connection: {
      ...credentials,
    },
  });

  return knex;
}

export function getDb() {
  if(!knex) {
    throw new Error('Connection to DB is not initialized !');
  }

  return knex;
}

export default initDb;
