import React from 'react';

import SpellReference from '../Reference';

const SpellReferenceColumn = ({ value }) => (
  <SpellReference spell={value} />
);

SpellReferenceColumn.defaultProps = {
  id: 'spell',
  label: 'Spell',
};

export default SpellReferenceColumn;
