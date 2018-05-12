import React from 'react';

import GameImage from '../../images/GameImage';
import number from '../number';

const Currency = ({ value }) => {
  const gold = (value / 10000) | 0;
  value = value % 10000;

  const silver = (value / 100) | 0;
  value = value % 100;

  const copper = value;

  return (
    <span>
      {gold ? (
        <span>
          {number(gold)}
          <GameImage file="Interface\MoneyFrame\UI-GoldIcon.blp" />
        </span>
      ) : null}

      {silver ? (
        <span>
          {silver}
          <GameImage file="Interface\MoneyFrame\UI-SilverIcon.blp" />
        </span>
      ) : null}

      {copper ? (
        <span>
          {copper}
          <GameImage file="Interface\MoneyFrame\UI-CopperIcon.blp" />
        </span>
      ) : null}
    </span>
  );
};

export default Currency;
