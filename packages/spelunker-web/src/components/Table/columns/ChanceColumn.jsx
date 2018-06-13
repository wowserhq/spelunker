import percent from '../../formatters/percent';

const ChanceColumn = ({ value }) => percent(value);

ChanceColumn.defaultProps = {
  id: 'chance',
  label: 'Chance',
  accessor: 'chance',
};

export default ChanceColumn;
