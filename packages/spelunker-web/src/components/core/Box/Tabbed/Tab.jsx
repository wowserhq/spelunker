import React from 'react';

const Tab = (props) => {
  const Component = props.component;
  return <Component {...props} />;
};

export default Tab;
