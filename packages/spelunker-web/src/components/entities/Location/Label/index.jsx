/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import classNames from 'classnames';

import styles from './index.styl';

class LocationLabel extends React.Component {
  constructor(...args) {
    super(...args);

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect() {
    this.props.onSelect(this.props.location);
  }

  render() {
    const {
      current,
      location: { name, spawnCount },
    } = this.props;

    const className = classNames(styles.label, {
      [styles.current]: current,
    });
    return (
      <span className={className} onClick={this.onSelect}>
        <span className={styles.name}>{name}</span>
        {spawnCount !== 1 && (
          <span className={styles.count}> ({spawnCount})</span>
        )}
      </span>
    );
  }
}

LocationLabel.defaultProps = {
  current: false,
  onSelect: () => {},
};

export default LocationLabel;
