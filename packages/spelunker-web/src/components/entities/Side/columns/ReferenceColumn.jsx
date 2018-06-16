import React from 'react';

import SideReference from '../Reference';

const SideReferenceColumn = ({ value: side }) => {
  if (!side) {
    return null;
  }
  return <SideReference side={side} />;
};

SideReferenceColumn.defaultProps = {
  id: 'side',
  label: 'Side',
};

export default SideReferenceColumn;
