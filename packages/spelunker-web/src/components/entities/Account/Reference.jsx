import React from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const AccountReference = ({ account }) => (
  <Link to={`/accounts/${account.id}`}>
    {account.name}
  </Link>
);

AccountReference.fragment = gql`
  fragment AccountReference on Account {
    id
    name
  }
`;

export default AccountReference;
