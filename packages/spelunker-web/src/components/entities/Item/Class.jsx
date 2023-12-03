import React from 'react';
import { gql } from '@apollo/client';

const ItemClass = ({ itemClass }) => (
  <div>
    {itemClass.name}
  </div>
);

ItemClass.fragment = gql`
  fragment ItemClass on Item {
    itemClass {
      id
      name
    }
  }
`;

export default ItemClass;
