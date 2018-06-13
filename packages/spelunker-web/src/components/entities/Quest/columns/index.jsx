import React from 'react';

import { IDColumn, PlaceholderColumn } from '../../../Table';

import QuestCategoryColumn from './CategoryColumn';
import QuestRacesClassesColumn from './RacesClassesColumn';
import QuestReferenceColumn from './ReferenceColumn';

export default [
  <IDColumn />,
  <QuestReferenceColumn />,
  <PlaceholderColumn label="Level" />,
  <QuestCategoryColumn />,
  <QuestRacesClassesColumn />,
];

export {
  QuestCategoryColumn,
  QuestRacesClassesColumn,
  QuestReferenceColumn,
};
