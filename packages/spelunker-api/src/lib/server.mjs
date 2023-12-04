import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

import pipeline from './pipeline/index.mjs';
import minimap from './minimap/index.mjs';
import rootValue from './graph/root.mjs';
import schema from './graph/schema/index.mjs';

const server = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '*').split(',');
// Necessary to ensure the '*'-default keeps working
const origin = allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins;

server.use(cors({ origin }));

// TODO: Use separate pipeline server
server.use('/pipeline', pipeline);

server.use('/minimap', minimap);

const apollo = new ApolloServer({
  schema,
  rootValue,
});

await apollo.start();

server.use('/graphql', express.json(), expressMiddleware(apollo));

export default server;
