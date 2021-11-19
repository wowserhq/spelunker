import React from 'react';
import { gql } from '@apollo/client';

import ClassReference from '../../Class/Reference';
import QuestCategory from '../Category';
import QuestReference from '../Reference';
import RaceReference from '../../Race/Reference';
import { IDColumn, LevelColumn } from '../../../core';

import QuestCategoryColumn from './CategoryColumn';
import QuestRacesClassesColumn from './RacesClassesColumn';
import QuestReferenceColumn from './ReferenceColumn';

const columns = [
  <IDColumn />,
  <QuestReferenceColumn />,
  <LevelColumn />,
  <QuestCategoryColumn />,
  <QuestRacesClassesColumn />,
];

columns.fragment = gql`
  fragment questColumns on Quest {
    ...QuestReference
    level
    category {
      ...QuestCategory
    }
    classes {
      results {
        ...ClassReference
      }
    }
    races(exclusive: true) {
      results {
        ...RaceReference
      }
    }
  }

  ${ClassReference.fragment}
  ${QuestCategory.fragment}
  ${QuestReference.fragment}
  ${RaceReference.fragment}
`;

export {
  QuestCategoryColumn,
  QuestRacesClassesColumn,
  QuestReferenceColumn,
  columns as default,
};
