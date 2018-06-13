import React from 'react';

import RaceReference from '../Reference';

const RaceReferenceColumn = ({ value }) => (
  <RaceReference race={value} />
);

RaceReferenceColumn.defaultProps = {
  id: 'race',
  label: 'Race',
};

export default RaceReferenceColumn;
