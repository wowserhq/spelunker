import Query from './Query';

class NoneQuery extends Query {
  execute() {
    return [];
  }

  find() {
    return null;
  }

  slice() {
    return this;
  }

  totalCount() {
    return 0;
  }
}

export default NoneQuery;
