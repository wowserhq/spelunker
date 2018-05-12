import React from 'react';

import ProjectLink from '../Spelunker/ProjectLink';

import styles from './index.styl';

const Error = ({ error }) => {
  const project = <ProjectLink label="Spelunker GitHub repository" />;
  return (
    <div className={styles.error}>
      <b>{error.message}</b>

      <p>
        GraphQL errors may be caused by inaccuracies in the database and
        should be reported to the applicable database vendor.
      </p>

      <p>
        Please report any other errors by opening an issue on the {project}.
      </p>

      <p>
        Stacktrace:
      </p>

      <pre className={styles.stack}>
        {error.stack}
      </pre>
    </div>
  );
};

export default Error;
