import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import styles from '../../Item/Reference/index.styl';

const ItemSetReference = ({ itemSet }) => (
  <Link
    to={`/item-sets/${itemSet.id}`}
    className={styles[itemSet.quality.toLowerCase()]}
  >
    {itemSet.name}
  </Link>
);

ItemSetReference.fragment = gql`
  fragment ItemSetReference on ItemSet {
    id
    name
    quality
  }
`;

export default ItemSetReference;
