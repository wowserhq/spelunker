import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

import ItemReference from '../Item/Reference';
import { Box, List, ListItem, Query, Title } from '../../core';

import ItemSetReference from './Reference';

const fetchItemSet = gql`
  query($id: Int!) {
    itemSet(id: $id) {
      ...ItemSetReference

      items {
        results {
          ...ItemReference
        }
      }
    }
  }

  ${ItemReference.fragment}
  ${ItemSetReference.fragment}
`;

const Item = () => {
  const params = useParams();
  const id = parseInt(params.id, 10);
  return (
    <Query query={fetchItemSet} variables={{ id }}>
      {({ data }) => {
        const { itemSet } = data;
        const {
          items,
        } = itemSet;

        return (
          <Title path={[itemSet.name, 'Item Sets']}>
            <Box>
              <h1>
                <ItemSetReference itemSet={itemSet} />
              </h1>

              <List>
                {items.results.map(item => (
                  <ListItem key={item.id}>
                    <ItemReference item={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Title>
        );
      }}
    </Query>
  );
};

export default Item;
