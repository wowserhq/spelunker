import apolloExpress from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

import pipeline from './pipeline/index.mjs';
import rootValue from './graph/root.mjs';
import schema from './graph/schema/index.mjs';
import { log } from './utils/logger.mjs';

const { ApolloServer } = apolloExpress;

const server = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '*').split(',');
// Necessary to ensure the '*'-default keeps working
const origin = allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins;

server.use(cors({ origin }));

// TODO: Use separate pipeline server
server.use('/pipeline', pipeline);

const startServer = async () => {
  const apollo = new ApolloServer({
    schema,
    rootValue,
  });

  await apollo.start();

  apollo.applyMiddleware({
    app: server,
    path: '/graphql',
    cors: { origin },
  });

  server.listen(process.env.API_PORT, () => {
    log(`listening on port ${process.env.API_PORT}`);
  });
}

export { startServer };
