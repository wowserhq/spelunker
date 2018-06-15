import React from 'react';

import RaceReference from '../Reference';

const RaceReferenceColumn = ({ value: race }) => (
  <RaceReference race={race} />
);

RaceReferenceColumn.defaultProps = {
  id: 'race',
  label: 'Race',
};

export default RaceReferenceColumn;
