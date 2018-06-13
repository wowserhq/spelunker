import React from 'react';

import Currency from '../../formatters/Currency';

const CurrencyColumn = ({ value }) => (
  <Currency value={value} />
);

export default CurrencyColumn;
