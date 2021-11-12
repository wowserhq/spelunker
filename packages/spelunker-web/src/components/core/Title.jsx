import React from 'react';

const SEPARATOR = ' · ';

class Title extends React.Component {
  UNSAFE_componentWillMount() {
    const path = [
      ...this.props.path,
      'Spelunker',
    ];

    document.title = path.join(SEPARATOR);
  }

  render() {
    return this.props.children;
  }
}

Title.defaultProps = {
  children: [],
  path: [],
};

export default Title;
