import React from 'react';
import gql from 'graphql-tag';

import ClassReference from '../../Class/Reference';
import Collection from '../../../Collection';
import QuestCategory from '../../Quest/Category';
import QuestReference from '../../Quest/Reference';
import RaceReference from '../../Race/Reference';
import Table, { Column, prefixAccessors } from '../../../Table';
import questColumns from '../../Quest/columns';

const listCurrentQuestsForCharacter = gql`
  query($id: Int!, $offset: Int) {
    character(id: $id) {
      id
      currentQuests(offset: $offset) {
        totalCount
        results {
          status
          quest {
            ...QuestReference
            category {
              ...QuestCategory
            }
            classes {
            ...ClassReference
            }
            races(exclusive: true) {
              ...RaceReference
            }
          }
        }
      }
    }
  }

  ${ClassReference.fragment}
  ${RaceReference.fragment}
  ${QuestCategory.fragment}
  ${QuestReference.fragment}
`;

const CurrentQuestsTab = ({ match }) => {
  const { id } = match.params;
  return (
    <Collection
      accessor="character.currentQuests"
      query={listCurrentQuestsForCharacter}
      variables={{ id }}
    >
      {({ results }) => (
        <Table
          data={results}
          columns={[
            ...prefixAccessors(questColumns, 'quest'),
            <Column id="status" label="Status" accessor="status" />,
          ]}
        />
      )}
    </Collection>
  );
};

export default CurrentQuestsTab;
