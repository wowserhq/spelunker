import PropTypes from 'prop-types';
import React from 'react';

import Pagination from '../Pagination';
import Query from '../Query';
import valueByPath from '../../utils/valueByPath';

const Collection = (props, { router }) => {
  const queryParams = new URLSearchParams(router.route.location.search);
  const offset = +queryParams.get('offset') || 0;
  const variables = Object.assign({}, props.variables, { offset });
  return (
    <Query {...props} variables={variables}>
      {(result) => {
        const { data } = result;
        const collection = valueByPath(data, props.field);

        const pagination = (
          <Pagination
            offset={offset}
            totalCount={collection.totalCount}
            queryParams={queryParams}
          />
        );

        Object.assign(result, collection);

        return (
          <div>
            {pagination}
            {props.children(result)}
            {pagination}
          </div>
        );
      }}
    </Query>
  );
};

Collection.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default Collection;
