import React from 'react';

import ItemReference from '../Reference';

const ItemReferenceColumn = ({ value: item }) => (
  <ItemReference item={item} />
);

ItemReferenceColumn.defaultProps = {
  id: 'item',
  label: 'Item',
};

export default ItemReferenceColumn;
