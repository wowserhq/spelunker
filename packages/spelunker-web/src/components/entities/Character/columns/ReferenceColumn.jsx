import React from 'react';

import CharacterReference from '../Reference';

const CharacterReferenceColumn = ({ value: character }) => (
  <CharacterReference character={character} />
);

CharacterReferenceColumn.defaultProps = {
  id: 'character',
  label: 'Character',
};

export default CharacterReferenceColumn;
