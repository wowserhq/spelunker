import React from 'react';
import { Link, Route, Routes, useLocation, useResolvedPath } from 'react-router-dom';

import styles from './index.styl';

const TabNav = ({ path, label, index }) => {
  const location = useLocation();
  const resolvedPath = useResolvedPath(path);
  const activeByPath = resolvedPath.pathname === location.pathname;
  const activeByDefault = index === 0 && location.pathname.split('/').length < resolvedPath.pathname.split('/').length;
  const active = activeByPath || activeByDefault;

  return (
    <li className={active ? styles.active : null}>
      <Link to={path}>
        <span className={styles.label}>{label}</span>
        <span className={styles.corners} />
      </Link>
    </li>
  );
};

const TabbedBox = (props) => {
  const tabs = React.Children.toArray(props.children);
  if (!tabs.length) {
    return null;
  }

  const tabRoutes = tabs.map(tab => (
    <Route key={tab.props.path} path={tab.props.path} element={tab} />
  ));

  return (
    <div className={styles.tabbed}>
      <ul className={styles.tabs}>
        {tabs.map((tab, index) => (
          <TabNav key={tab.props.path} {...tab.props} index={index} />
        ))}
      </ul>

      <Routes>
        {tabRoutes}
        <Route index element={tabs[0]} />
      </Routes>
    </div>
  );
};

export default TabbedBox;
