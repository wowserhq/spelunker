const Column = ({ children: renderer, value }) => (
  renderer(value)
);

Column.defaultProps = {
  children: (value) => value,
  label: 'Column',
};

export default Column;
