import React from 'react';
import gql from 'graphql-tag';

import Box, { Tab, TabbedBox } from '../../Box';
import Query from '../../Query';
import Title from '../../Spelunker/Title';

import EndedByTab from './tabs/EndedBy';
import EndedByObjectTab from './tabs/EndedByObject';
import QuestReference from './Reference';
import StartedByTab from './tabs/StartedBy';
import StartedByItemTab from './tabs/StartedByItem';
import StartedByObjectTab from './tabs/StartedByObject';

const fetchQuest = gql`
  query($id: Int!) {
    quest(id: $id) {
      id
      name
      description
      endedBy {
        totalCount
      }
      endedByObject {
        totalCount
      }
      startedBy {
        totalCount
      }
      startedByItem {
        totalCount
      }
      startedByObject {
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
        const { quest } = data;
        const {
          name,
          description,
          endedBy: { totalCount: endedByCount },
          endedByObject: { totalCount: endedByObjectCount },
          startedBy: { totalCount: startedByCount },
          startedByItem: { totalCount: startedByItemCount },
          startedByObject: { totalCount: startedByObjectCount },
        } = quest;

        return (
          <Title path={[name, 'Quests']}>
            <Box>
              <h1>
                <QuestReference quest={quest} />
              </h1>

              <p>
                {description}
              </p>
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

              {startedByObjectCount > 0 && <Tab
                label={`Started by object (${startedByObjectCount})`}
                component={StartedByObjectTab}
                path="started-by-object"
                match={match}
              />}

              {endedByObjectCount > 0 && <Tab
                label={`Ended by object (${endedByObjectCount})`}
                component={EndedByObjectTab}
                path="ended-by-object"
                match={match}
              />}

              {startedByItemCount > 0 && <Tab
                label={`Started by item (${startedByItemCount})`}
                component={StartedByItemTab}
                path="started-by-item"
                match={match}
              />}
            </TabbedBox>
          </Title>
        );
      }}
    </Query>
  );
};

export default Quest;
