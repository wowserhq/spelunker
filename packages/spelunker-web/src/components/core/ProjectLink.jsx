import React from 'react';
import { Link } from 'react-router-dom';

const ProjectLink = (props) => (
  <Link to="https://github.com/wowserhq/spelunker" target="_blank">
    {props.label}
  </Link>
);

ProjectLink.defaultProps = {
  label: 'Spelunker',
};

export default ProjectLink;
