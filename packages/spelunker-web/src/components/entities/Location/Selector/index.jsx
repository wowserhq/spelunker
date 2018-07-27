import React from 'react';

import Label from '../Label';
import Location from '../';
import { GameMap, GameMapPin, Sentence, SentenceItem } from '../../../core';

class LocationSelector extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);

    // As not all locations map easily to an area, flatten all locations into a
    // mixed list of maps and areas
    const locations = [].concat(...props.locations.map(location => {
      const {
        areas: { results: areas },
        map,
        spawns: { totalCount: spawnCount, results: spawns },
      } = location;
      if (areas.length) {
        return areas.map(({ area, spawnCount }) => new Location({
          area, map, spawns, spawnCount,
        }));
      }
      return new Location({ map, spawns, spawnCount });
    }));

    this.state = {
      current: locations[0],
      locations,
    };

    this.select = this.select.bind(this);
  }

  select(location) {
    this.setState({ current: location });
  }

  render() {
    const { entity } = this.props;
    const { current, locations } = this.state;

    if (!current) {
      return (
        <p>No known location for this {entity}</p>
      );
    }

    const { area, map, spawns } = current;

    const sentence = (
      <Sentence>
        {locations.map(location => (
          <SentenceItem key={location.id}>
            <Label
              current={current === location}
              location={location}
              onSelect={this.select}
            />
          </SentenceItem>
        ))}
      </Sentence>
    );

    return (
      <div>
        <p>
          This {entity} can be found in: {sentence}
        </p>

        <GameMap
          bounds={area && area.bounds}
          map={map}
        >
          {spawns.map((spawn, index) => (
            <GameMapPin
              key={spawn.id || index}
              x={spawn.x}
              y={spawn.y}
            />
          ))}
        </GameMap>
      </div>
    );
  }
}

LocationSelector.defaultProps = {
  entity: 'entity',
  locations: [],
};

export default LocationSelector;
