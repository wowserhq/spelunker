const MAX_RESULTS = 25;

class Collection {
  constructor(query, args) {
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

    this.query = query;
  }

  async totalCount() {
    return this.query.count();
  }

  async results() {
    return this.query.slice(this.offset, this.limit);
  }
}

export default Collection;
