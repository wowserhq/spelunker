import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const ClassReference = ({ class: klass }) => (
  <Link to={`/classes/${klass.id}`}>
    {klass.name}
  </Link>
);

ClassReference.fragment = gql`
  fragment ClassReference on Class {
    id
    name
  }
`;

export default ClassReference;
