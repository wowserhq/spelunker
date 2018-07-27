import React from 'react';

import Error from './';

class ErrorBoundary extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <Error error={error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
