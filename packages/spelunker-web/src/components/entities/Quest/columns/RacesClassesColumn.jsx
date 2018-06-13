import React from 'react';

import ClassReference from '../../Class/Reference';
import RaceReference from '../../Race/Reference';

const QuestRacesClassesColumn = ({ value: quest }) => (
  <span>
    {quest.races.map(race => (
      <RaceReference race={race} iconSize="small" withoutName />
    ))}
    {quest.classes.map(klass => (
      <ClassReference class={klass} iconSize="small" withoutName />
    ))}
  </span>
);

QuestRacesClassesColumn.defaultProps = {
  id: 'races-and-classes',
  label: 'Races & Classes',
};

export default QuestRacesClassesColumn;
