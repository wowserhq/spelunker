/* eslint-disable no-console */

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { collectionPolicy } from '../../utils/policies';

const cache = new InMemoryCache({
  possibleTypes: {
    QuestCategory: ['Area', 'QuestSort'],
  },
  typePolicies: {
    Area: {
      fields: {
        quests: collectionPolicy(),
      },
    },
    Quest: {
      fields: {
        classes: collectionPolicy(),
        races: collectionPolicy({ keyArgs: ['exclusive'] }),
      },
    },
  },
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, path }) =>
          console.error(
            `${message}${path ? `\n\nPath: ${path}` : ''}`,
          ),
        );
      }
      if (networkError) {
        console.error(networkError);
      }
    }),
    new HttpLink({
      uri: process.env.API_URI,
      credentials: 'same-origin',
    }),
  ]),
});

export default client;
