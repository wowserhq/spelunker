import knex from 'knex';

const authConnection = knex(process.env.DATABASE_AUTH_URI);
const characterConnection = knex(process.env.DATABASE_CHARACTERS_URI);
const worldConnection = knex(process.env.DATABASE_WORLD_URI);

export {
  authConnection,
  characterConnection,
  worldConnection,
};
