import { gql } from '@apollo/client';

const Bounds = () => {};

Bounds.fragment = gql`
  fragment Bounds on Bounds {
    top
    bottom
    left
    right
  }
`;

export default Bounds;
