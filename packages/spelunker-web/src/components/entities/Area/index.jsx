import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import AreaReference from './Reference';

const fetchArea = gql`
  query($id: Int!) {
    area(id: $id) {
      ...AreaReference
    }
  }

  ${AreaReference.fragment}
`;

const Area = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchArea} variables={{ id }}>
      {({ data }) => {
        const { area } = data;
        const {
          name,
        } = area;

        return (
          <Title path={[name, 'Areas']}>
            <Box>
              <h1>
                <AreaReference area={area} />
              </h1>

              <h2>In-game map</h2>

              <p>
                Soon
              </p>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Area;
