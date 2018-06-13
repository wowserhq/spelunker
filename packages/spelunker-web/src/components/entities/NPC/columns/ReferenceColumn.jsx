import React from 'react';

import NPCReference from '../Reference';

const NPCReferenceColumn = ({ value: npc }) => (
  <NPCReference npc={npc} />
);

NPCReferenceColumn.defaultProps = {
  id: 'npc',
  label: 'NPC',
};

export default NPCReferenceColumn;
