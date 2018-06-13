import styles from './index.styl';

const PlaceholderColumn = () => 'N/A';

PlaceholderColumn.defaultProps = {
  label: 'Placeholder',
  className: styles.placeholder,
};

export default PlaceholderColumn;
