import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import SideIcon from './Icon';

const SideReference = ({ side, withoutIcon, withoutName }) => (
  <Link to={`/sides/${side.id}`}>
    {!withoutIcon && <SideIcon side={side} />}
    {!withoutName && side.name}
  </Link>
);

SideReference.defaultProps = {
  withoutIcon: false,
  withoutName: false,
};

SideReference.fragment = gql`
  fragment SideReference on Side {
    id
    name
    icon
  }
`;

export default SideReference;
