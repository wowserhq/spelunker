import React from 'react';

const Form = (props) => (
  <form {...props}>
    {props.children}
  </form>
);

export default Form;
export { default as Button } from './Button';
export { default as Input } from './Input';
