import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import GameIcon from '../../../images/GameIcon';

import styles from './index.styl';

const ItemReference = ({ item }) => (
  <Link
    to={`/items/${item.id}`}
    className={styles[item.quality.toLowerCase()]}
  >
    {item.displayInfo && (
      <GameIcon className={styles.icon} file={item.displayInfo.icon} />
    )}
    {item.name}
  </Link>
);

ItemReference.fragment = gql`
  fragment ItemReference on Item {
    id
    name
    quality
    displayInfo {
      icon
    }
  }
`;

export default ItemReference;
