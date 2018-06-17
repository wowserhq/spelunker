const MAX_RESULTS = 25;

class Collection {
  constructor(query, args = {}) {
    this.query = query;

    this.offset = args.offset || 0;
    this.limit = args.limit || MAX_RESULTS;

    if (this.offset < 0) {
      throw new Error('offset must be at least 0');
    }

    if (this.limit < 0) {
      throw new Error('limit must be at least 0');
    }

    if (this.limit > MAX_RESULTS) {
      throw new Error(`limit must not exceed ${MAX_RESULTS}`);
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
