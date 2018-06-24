import styles from './index.styl';

const LevelColumn = ({ value }) => value;

LevelColumn.defaultProps = {
  id: 'level',
  label: 'Level',
  accessor: 'level',
  className: styles.level,
};

export default LevelColumn;
