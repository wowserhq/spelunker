import React from 'react';

import AccountReference from '../Reference';

const AccountReferenceColumn = ({ value: account }) => (
  <AccountReference account={account} />
);

AccountReferenceColumn.defaultProps = {
  id: 'account',
  label: 'Account',
};

export default AccountReferenceColumn;
