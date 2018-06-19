import React from 'react';

export default (columns, prefix) => (
  columns.map(column => React.cloneElement(column, {
    accessor: `${prefix}.${column.props.accessor || ''}`,
  }))
);
