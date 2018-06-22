import React from 'react';

const Button = (props) => (
  <button {...props}>
    {props.label}
  </button>
);

Button.defaultProps = {
  label: 'Button',
};

export default Button;
