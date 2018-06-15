import React from 'react';

import SpellReference from '../Reference';

const SpellReferenceColumn = ({ value: spell }) => (
  <SpellReference spell={spell} />
);

SpellReferenceColumn.defaultProps = {
  id: 'spell',
  label: 'Spell',
};

export default SpellReferenceColumn;
