// Here we mock our database
// We use knex and mock-knex to have the same interface
import * as mockDb from './mocks/sql';

jest.mock('../src/sql', () => mockDb);
