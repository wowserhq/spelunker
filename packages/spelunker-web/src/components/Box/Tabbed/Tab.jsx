import React from 'react';

const Tab = (props) => {
  if (!props.active) {
    return null;
  }

  const Component = props.component;
  return <Component {...props} />;
};

export default Tab;
