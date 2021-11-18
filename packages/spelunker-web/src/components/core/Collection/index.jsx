import React from 'react';
import { useLocation } from 'react-router-dom';

import Pagination from '../Pagination';
import Query from '../Query';
import valueByPath from '../../../utils/valueByPath';

const Collection = (props) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const offset = +queryParams.get('offset') || 0;
  const variables = Object.assign({}, props.variables, { offset });
  return (
    <Query {...props} variables={variables}>
      {(result) => {
        const { data } = result;
        const collection = valueByPath(data, props.accessor);

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

export default Collection;
