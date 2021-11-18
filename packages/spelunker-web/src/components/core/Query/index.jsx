import React from 'react';
import { Query as ApolloQuery } from '@apollo/client/react/components';

import { Error, ErrorBoundary } from '../';

const Query = (props) => (
  <ErrorBoundary>
    <ApolloQuery {...props}>
      {(result) => {
        if (result.loading) return <p>Loading...</p>;
        if (result.error) return <Error error={result.error} />;

        return props.children(result);
      }}
    </ApolloQuery>
  </ErrorBoundary>
);

export default Query;
