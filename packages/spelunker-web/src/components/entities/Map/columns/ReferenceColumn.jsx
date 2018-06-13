import React from 'react';

import MapReference from '../Reference';

const MapReferenceColumn = ({ value: map }) => (
  <MapReference map={map} />
);

MapReferenceColumn.defaultProps = {
  id: 'map',
  label: 'Map',
};

export default MapReferenceColumn;
