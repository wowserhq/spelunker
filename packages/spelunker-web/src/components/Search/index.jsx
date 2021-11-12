import React from 'react';
import gql from 'graphql-tag';

import {
  Box,
  Button,
  Form,
  Input,
  Query,
  Tab,
  TabbedBox,
  Title,
} from '../core';

import ResultsTab from './ResultsTab';

const search = gql`
  query($searchQuery: String!) {
    accounts(searchQuery: $searchQuery) {
      totalCount
    }
    areas(searchQuery: $searchQuery) {
      totalCount
    }
    characters(searchQuery: $searchQuery) {
      totalCount
    }
    classes(searchQuery: $searchQuery) {
      totalCount
    }
    factions(searchQuery: $searchQuery) {
      totalCount
    }
    objects(searchQuery: $searchQuery) {
      totalCount
    }
    items(searchQuery: $searchQuery) {
      totalCount
    }
    itemSets(searchQuery: $searchQuery) {
      totalCount
    }
    maps(searchQuery: $searchQuery) {
      totalCount
    }
    npcs(searchQuery: $searchQuery) {
      totalCount
    }
    quests(searchQuery: $searchQuery) {
      totalCount
    }
    races(searchQuery: $searchQuery) {
      totalCount
    }
    sides(searchQuery: $searchQuery) {
      totalCount
    }
    spells(searchQuery: $searchQuery) {
      totalCount
    }
  }
`;

class Search extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    this.state = {
      query: props.match.params.query || '',
    };

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onQueryChange(e) {
    this.setState({ query: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.history.push(`/search/${this.state.query}`);
  }

  render() {
    const { query } = this.state;
    const { match } = this.props;
    const { params: { query: submittedQuery } } = match;
    return (
      <Title>
        <Box>
          <Form onSubmit={this.onSubmit}>
            <Input value={query} onChange={this.onQueryChange} />
            <Button label="Search" />
          </Form>
        </Box>

        {submittedQuery &&
          <Query query={search} variables={{ searchQuery: submittedQuery }}>
            {({ data }) => {
              const {
                accounts: { totalCount: accountCount },
                areas: { totalCount: areaCount },
                characters: { totalCount: characterCount },
                classes: { totalCount: classCount },
                factions: { totalCount: factionCount },
                objects: { totalCount: objectCount },
                items: { totalCount: itemCount },
                itemSets: { totalCount: itemSetCount },
                maps: { totalCount: mapCount },
                npcs: { totalCount: npcCount },
                quests: { totalCount: questCount },
                races: { totalCount: raceCount },
                sides: { totalCount: sideCount },
                spells: { totalCount: spellCount },
              } = data;

              return (
                <TabbedBox>
                  {accountCount > 0 && <Tab
                    label={`Accounts (${accountCount})`}
                    component={ResultsTab}
                    path="accounts"
                    match={match}
                    columnsFragmentName="accountColumns"
                  />}

                  {areaCount > 0 && <Tab
                    label={`Areas (${areaCount})`}
                    component={ResultsTab}
                    path="areas"
                    match={match}
                    columnsFragmentName="areaColumns"
                  />}

                  {characterCount > 0 && <Tab
                    label={`Characters (${characterCount})`}
                    component={ResultsTab}
                    path="characters"
                    match={match}
                    columnsFragmentName="characterColumns"
                  />}

                  {classCount > 0 && <Tab
                    label={`Classes (${classCount})`}
                    component={ResultsTab}
                    path="classes"
                    match={match}
                    columnsFragmentName="classColumns"
                  />}

                  {factionCount > 0 && <Tab
                    label={`Factions (${factionCount})`}
                    component={ResultsTab}
                    path="factions"
                    match={match}
                    columnsFragmentName="factionColumns"
                  />}

                  {objectCount > 0 && <Tab
                    label={`Objects (${objectCount})`}
                    component={ResultsTab}
                    path="objects"
                    match={match}
                    columnsFragmentName="gameObjectColumns"
                  />}

                  {itemCount > 0 && <Tab
                    label={`Items (${itemCount})`}
                    component={ResultsTab}
                    path="items"
                    match={match}
                    columnsFragmentName="itemColumns"
                  />}

                  {itemSetCount > 0 && <Tab
                    label={`Item Sets (${itemSetCount})`}
                    component={ResultsTab}
                    path="item-sets"
                    match={match}
                    accessor="itemSets"
                    columnsFragmentName="itemSetColumns"
                  />}

                  {mapCount > 0 && <Tab
                    label={`Maps (${mapCount})`}
                    component={ResultsTab}
                    path="maps"
                    match={match}
                    columnsFragmentName="mapColumns"
                  />}

                  {npcCount > 0 && <Tab
                    label={`NPCs (${npcCount})`}
                    component={ResultsTab}
                    path="npcs"
                    match={match}
                    columnsFragmentName="npcColumns"
                  />}

                  {questCount > 0 && <Tab
                    label={`Quests (${questCount})`}
                    component={ResultsTab}
                    path="quests"
                    match={match}
                    columnsFragmentName="questColumns"
                  />}

                  {raceCount > 0 && <Tab
                    label={`Races (${raceCount})`}
                    component={ResultsTab}
                    path="races"
                    match={match}
                    columnsFragmentName="raceColumns"
                  />}

                  {sideCount > 0 && <Tab
                    label={`Sides (${sideCount})`}
                    component={ResultsTab}
                    path="sides"
                    match={match}
                    columnsFragmentName="sideColumns"
                  />}

                  {spellCount > 0 && <Tab
                    label={`Spells (${spellCount})`}
                    component={ResultsTab}
                    path="spells"
                    match={match}
                    columnsFragmentName="spellColumns"
                  />}
                </TabbedBox>
              );
            }}
          </Query>}
      </Title>
    );
  }
}

export default Search;
