import apolloExpress from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import pipeline from './pipeline';
import rootValue from './graph/root';
import schema from './graph/schema';

const { graphqlExpress, graphiqlExpress } = apolloExpress;

const server = express();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || '*').split(',');
server.use(cors({
  // Necessary to ensure the '*'-default keeps working
  origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
}));

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema, rootValue }));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// TODO: Use separate pipeline server
server.use('/pipeline', pipeline);

export default server;
