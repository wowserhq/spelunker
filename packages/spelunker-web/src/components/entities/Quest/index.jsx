import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';

import EndedByTab from './tabs/EndedBy';
import StartedByTab from './tabs/StartedBy';

const fetchQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      name
      startedBy {
        totalCount
      }
      endedBy {
        totalCount
      }
      startedByObject {
        totalCount
      }
      endedByObject {
        totalCount
      }
    }
  }
`;

const Quest = ({ match }) => {
  const { id } = match.params;
  return (
    <Query query={fetchQuest} variables={{ id }}>
      {({ data }) => {
        const { quest: {
          startedBy: { totalCount: startedByCount },
          endedBy: { totalCount: endedByCount },
        } } = data;

        return (
          <div>
            <Box>
              <legend>{data.quest.name}</legend>
            </Box>

            <TabbedBox>
              {startedByCount > 0 && <Tab
                label={`Started by (${startedByCount})`}
                component={StartedByTab}
                path="started-by"
                match={match}
              />}

              {endedByCount > 0 && <Tab
                label={`Ended by (${endedByCount})`}
                component={EndedByTab}
                path="ended-by"
                match={match}
              />}
            </TabbedBox>
          </div>
        );
      }}
    </Query>
  );
};

export default Quest;
