import React from 'react';

import FactionReference from '../Reference';

const FactionReferenceColumn = ({ value: faction }) => (
  <FactionReference faction={faction} />
);

FactionReferenceColumn.defaultProps = {
  id: 'faction',
  label: 'Faction',
};

export default FactionReferenceColumn;
