import styles from './index.styl';

const IDColumn = ({ value }) => value;

IDColumn.defaultProps = {
  id: 'id',
  label: '#',
  accessor: 'id',
  className: styles.id,
};

export default IDColumn;
