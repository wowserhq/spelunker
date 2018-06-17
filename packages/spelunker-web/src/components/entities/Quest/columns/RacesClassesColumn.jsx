import React from 'react';

import ClassReference from '../../Class/Reference';
import RaceReference from '../../Race/Reference';

const QuestRacesClassesColumn = ({ value: quest }) => (
  <span>
    {quest.races.results.map(race => (
      <RaceReference
        key={race.id}
        race={race}
        iconSize="small"
        withoutName
      />
    ))}
    {quest.classes.results.map(klass => (
      <ClassReference
        key={klass.id}
        class={klass}
        iconSize="small"
        withoutName
      />
    ))}
  </span>
);

QuestRacesClassesColumn.defaultProps = {
  id: 'races-and-classes',
  label: 'Races & Classes',
};

export default QuestRacesClassesColumn;
