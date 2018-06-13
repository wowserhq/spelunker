import React from 'react';

import AreaReference from '../Reference';

const AreaReferenceColumn = ({ value: area }) => (
  <AreaReference area={area} />
);

AreaReferenceColumn.defaultProps = {
  id: 'area',
  label: 'Area',
};

export default AreaReferenceColumn;
