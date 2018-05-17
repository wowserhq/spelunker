import React from 'react';
import gql from 'graphql-tag';

import Box from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import FactionReference from './Reference';

const fetchFaction = gql`
  query($id: Int!) {
    faction(id: $id) {
      id
      name
    }
  }
`;

const Faction = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchFaction} variables={{ id }}>
      {({ data }) => {
        const { faction } = data;
        const { name } = faction;
        return (
          <Title path={[name, 'Factions']}>
            <Box>
              <h1>
                <FactionReference faction={faction} />
              </h1>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Faction;
