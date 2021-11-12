import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [{
        kind: 'UNION',
        name: 'QuestCategory',
        possibleTypes: [
          { name: 'Area' },
          { name: 'QuestSort' },
        ],
      }],
    },
  },
});

const cache = new InMemoryCache({ fragmentMatcher });

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
