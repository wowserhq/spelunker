const MAX_RESULTS_PER_PAGE = 25;

class Collection {
  constructor(
    query,
    {
      args = {},
      maxResults = MAX_RESULTS_PER_PAGE,
    } = {},
  ) {
    this.query = query;

    this.offset = args.offset || 0;
    this.limit = args.limit || maxResults;

    if (this.offset < 0) {
      throw new Error('offset must be at least 0');
    }

    if (this.limit < 0) {
      throw new Error('limit must be at least 0');
    }

    if (this.limit > maxResults) {
      throw new Error(`limit must not exceed ${maxResults}`);
    }
  }

  async totalCount() {
    return this.query.totalCount();
  }

  async results() {
    return this.query.slice(this.offset, this.limit).execute();
  }
}

export default Collection;
