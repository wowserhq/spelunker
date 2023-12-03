import React from 'react';

const ProjectLink = (props) => (
  // eslint-disable-next-line react/jsx-no-target-blank
  <a href="https://github.com/wowserhq/spelunker" target="_blank">
    {props.label}
  </a>
);

ProjectLink.defaultProps = {
  label: 'Spelunker',
};

export default ProjectLink;
