import React from 'react';

import ItemClass from '../Class';

const ItemClassColumn = ({ value: item }) => (
  <ItemClass itemClass={item.itemClass} />
);

ItemClassColumn.defaultProps = {
  id: 'itemClass',
  label: 'Item Class',
};

export default ItemClassColumn;
