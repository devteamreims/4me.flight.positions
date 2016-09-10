import setupKnex from 'knex';
import mockDb from 'mock-knex';

let knex;

export function initDb() {
  knex = mockDb.mock(
    setupKnex({
      client: 'mysql',
      //useNullAsDefault: true,
    })
  );

  return knex;
}

export function getDb() {
  return knex;
}
