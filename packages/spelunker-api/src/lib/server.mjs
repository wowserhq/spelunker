import apolloExpress from 'apollo-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import pipeline from './pipeline';
import rootValue from './graph/root';
import schema from './graph/schema';

const { graphqlExpress, graphiqlExpress } = apolloExpress;

const server = express();

// TODO: Secure CORS configuration
server.use(cors());

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema, rootValue }));
server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// TODO: Use separate pipeline server
server.use('/pipeline', pipeline);

export default server;
