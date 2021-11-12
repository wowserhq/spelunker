import React from 'react';
import { Link, matchPath, withRouter } from 'react-router-dom';

import styles from './index.styl';

const TabbedBox = (props) => {
  const children = React.Children.toArray(props.children);
  if (!children.length) {
    return null;
  }

  const { history, location } = props;

  let match = false;
  const tabs = children.map(child => {
    const active = matchPath(
      location.pathname,
      { path: `${child.props.match.path}/${child.props.path}` },
    );

    if (active) {
      match = true;
    }

    return React.cloneElement(
      child,
      {
        target: `${child.props.match.url}/${child.props.path}`,
        active,
      },
    );
  });

  if (!match) {
    history.replace(tabs[0].props.target);
    return null;
  }

  return (
    <div className={styles.tabbed}>
      <ul className={styles.tabs}>
        {tabs.map(tab => (
          <li
            key={tab.props.label}
            className={tab.props.active ? styles.active : null}
          >
            <Link to={`${tab.props.match.url}/${tab.props.path}`}>
              <span className={styles.label}>{tab.props.label}</span>
              <span className={styles.corners} />
            </Link>
          </li>
        ))}
      </ul>

      {tabs}
    </div>
  );
};

export default withRouter(TabbedBox);
