import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import ClassIcon from './Icon';

const ClassReference = ({ class: klass }) => (
  <Link to={`/classes/${klass.id}`}>
    <ClassIcon class={klass} />
    {klass.name}
  </Link>
);

ClassReference.fragment = gql`
  fragment ClassReference on Class {
    id
    name
    filename
  }
`;

export default ClassReference;
