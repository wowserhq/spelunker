import React from 'react';

import valueByPath from '../../utils/valueByPath';

import styles from './index.styl';

const Table = ({ data, columns, keyField = 'id' }) => {
  if (!data.length) {
    return null;
  }

  const headers = columns.map((column, index) => (
    <th
      key={column.props.id || index}
      className={column.props.className}
    >
      {column.props.label}
    </th>
  ));

  const rows = data.map(row => (
    <tr
      key={row[keyField]}
    >
      {columns.map((column, index) => {
        const cell = React.cloneElement(column, {
          value: valueByPath(row, column.props.accessor),
        });
        return (
          <td
            key={column.props.id || index}
            className={column.props.className}
          >
            {cell}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  columns: [],
};

export default Table;
export { default as prefixAccessors } from './utils/prefixAccessors';
export * from './columns';
