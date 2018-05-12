import React from 'react';
import { Link } from 'react-router-dom';

import number from '../formatters/number';

import styles from './index.styl';

const PER_PAGE = 25;
const PADDING_PAGES = 3;

const Pagination = ({ totalCount, offset, queryParams }) => {
  const currentPage = Math.ceil(offset / PER_PAGE);
  const numPages = Math.ceil(totalCount / PER_PAGE);

  if (numPages <= 1) {
    return null;
  }

  const pages = [];
  let skipping = false;
  for (let i = 0; i < numPages; ++i) {
    if (
      i < PADDING_PAGES ||
      Math.abs(i - currentPage) < PADDING_PAGES ||
      Math.abs(i - numPages) <= PADDING_PAGES
    ) {
      queryParams.set('offset', i * PER_PAGE);
      const item = (
        <li key={i + 1}>
          <Link
            className={i === currentPage ? styles.active : null}
            to={`?${queryParams}`}
          >
            {i + 1}
          </Link>
        </li>
      );
      pages.push(item);
      skipping = false;
    } else if (!skipping) {
      const spacer = <li key={i + 1} className={styles.spacer}>···</li>;
      pages.push(spacer);
      skipping = true;
    }
  }

  const start = number(offset + 1);
  const end = number(Math.min(offset + PER_PAGE, totalCount));
  const total = number(totalCount);

  return (
    <div className={styles.pagination}>
      <ul>
        {pages}
      </ul>

      <div className={styles.legend}>
        <b>{start}</b> – <b>{end}</b> of <b>{total}</b>
      </div>
    </div>
  );
};

Pagination.defaultProps = {
  perPage: PER_PAGE,
};

export default Pagination;
