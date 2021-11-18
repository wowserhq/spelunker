import React from 'react';
import classNames from 'classnames';
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import SideReference from '../../Side/Reference';

import styles from './index.styl';

const QuestReference = ({ quest }) => {
  const className = classNames({
    [styles.repeatable]: quest.repeatable,
  });
  return (
    <span className={className}>
      {quest.sides.results.map(side => (
        <SideReference key={side.id} side={side} withoutName />
      ))}
      <Link to={`/quests/${quest.id}`}>
        {quest.name}
      </Link>
      {quest.previousQuest && (
        <span className={styles.chain}>*</span>
      )}
    </span>
  );
};

QuestReference.fragment = gql`
  fragment QuestReference on Quest {
    id
    name
    previousQuest {
      id
    }
    repeatable
    sides {
      results {
        ...SideReference
      }
    }
  }

  ${SideReference.fragment}
`;

export default QuestReference;
