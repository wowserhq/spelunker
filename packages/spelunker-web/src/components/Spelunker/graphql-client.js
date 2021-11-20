/* eslint-disable no-console */

import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

import { collectionPolicy } from '../../utils/policies';

const cache = new InMemoryCache({
  possibleTypes: {
    QuestCategory: ['Area', 'QuestSort'],
  },
  typePolicies: {
    Area: {
      fields: {
        quests: collectionPolicy(),
        subareas: collectionPolicy(),
      },
    },
    Quest: {
      fields: {
        classes: collectionPolicy(),
        races: collectionPolicy('exclusive'),
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
    createPersistedQueryLink({ sha256, useGETForHashedQueries: true }),
    new HttpLink({
      uri: process.env.API_URI,
      credentials: 'same-origin',
    }),
  ]),
});

export default client;
