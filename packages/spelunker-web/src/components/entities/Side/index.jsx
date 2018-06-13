import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import SideReference from './Reference';

const fetchSide = gql`
  query($id: String!) {
    side(id: $id) {
      ...SideReference
    }
  }

  ${SideReference.fragment}
`;

const Side = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchSide} variables={{ id }}>
      {({ data }) => {
        const { side } = data;
        const {
          name,
        } = side;

        return (
          <Title path={[name, 'Sides']}>
            <Box>
              <h1>
                <SideReference side={side} />
              </h1>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Side;
