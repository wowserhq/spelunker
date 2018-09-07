import React from 'react';

import ItemSetReference from '../Reference';

const ItemSetReferenceColumn = ({ value: itemSet }) => (
  <ItemSetReference itemSet={itemSet} />
);

ItemSetReferenceColumn.defaultProps = {
  id: 'item-set',
  label: 'Item Set',
};

export default ItemSetReferenceColumn;
