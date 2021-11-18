import React from 'react';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import ClassIcon from './Icon';

const ClassReference = ({
  class: klass,
  iconSize,
  withoutIcon,
  withoutName,
}) => (
  <Link to={`/classes/${klass.id}`}>
    {!withoutIcon && <ClassIcon class={klass} size={iconSize} />}
    {!withoutName && klass.name}
  </Link>
);

ClassReference.defaultProps = {
  withoutIcon: false,
  withoutName: false,
};

ClassReference.fragment = gql`
  fragment ClassReference on Class {
    id
    name
    filename
  }
`;

export default ClassReference;
