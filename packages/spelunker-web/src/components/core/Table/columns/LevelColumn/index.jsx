import styles from './index.styl';

const LevelColumn = ({ value }) => {
  if (value <= 0) {
    return null;
  }
  return value;
};

LevelColumn.defaultProps = {
  id: 'level',
  label: 'Level',
  accessor: 'level',
  className: styles.level,
};

export default LevelColumn;
