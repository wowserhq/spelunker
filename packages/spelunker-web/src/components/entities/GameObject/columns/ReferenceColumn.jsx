import React from 'react';

import GameObjectReference from '../Reference';

const GameObjectReferenceColumn = ({ value: object }) => (
  <GameObjectReference object={object} />
);

GameObjectReferenceColumn.defaultProps = {
  id: 'object',
  label: 'Object',
};

export default GameObjectReferenceColumn;
