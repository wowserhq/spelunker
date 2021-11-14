import knex from 'knex';

const authConnection = knex({
  client: 'mysql2',
  connection: process.env.DATABASE_AUTH_URI,
});
const charactersConnection = knex({
  client: 'mysql2',
  connection: process.env.DATABASE_CHARACTERS_URI,
});
const worldConnection = knex({
  client: 'mysql2',
  connection: process.env.DATABASE_WORLD_URI,
});

export {
  authConnection,
  charactersConnection,
  worldConnection,
};
