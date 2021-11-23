import React from 'react';

import GameIcon from '../../images/GameIcon';
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
          {number(gold)}&nbsp;
          <GameIcon file="Interface/MoneyFrame/UI-GoldIcon.blp" />
        </span>
      ) : null}

      {silver ? (
        <span>
          {silver}&nbsp;
          <GameIcon file="Interface/MoneyFrame/UI-SilverIcon.blp" />
        </span>
      ) : null}

      {copper ? (
        <span>
          {copper}&nbsp;
          <GameIcon file="Interface/MoneyFrame/UI-CopperIcon.blp" />
        </span>
      ) : null}
    </span>
  );
};

export default Currency;
