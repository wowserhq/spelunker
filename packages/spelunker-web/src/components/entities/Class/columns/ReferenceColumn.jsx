import React from 'react';

import ClassReference from '../Reference';

const ClassReferenceColumn = ({ value: klass }) => (
  <ClassReference class={klass} />
);

ClassReferenceColumn.defaultProps = {
  id: 'class',
  label: 'Class',
};

export default ClassReferenceColumn;
