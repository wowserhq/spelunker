import React from 'react';
import { Query as ApolloQuery } from 'react-apollo';

import Error from '../Error';

class Query extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentDidCatch(error) {
    this.setState({ error: error });
  }

  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }

    return (
      <ApolloQuery {...this.props}>
        {(result) => {
          if (result.loading) return <p>Loading...</p>;
          if (result.error) return <Error error={result.error} />;

          return this.props.children(result);
        }}
      </ApolloQuery>
    );
  }
}

export default Query;
