import { getSelectedFields } from '../graphql';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

const getCollectionResults = (collection, args) => {
  const offset = args?.offset ?? DEFAULT_OFFSET;
  const limit = args?.limit ?? DEFAULT_LIMIT;

  // Clamp limit by total
  const total = collection.totalCount ?? offset + limit;
  const clampedLimit = Math.min(limit, total - offset);

  const results = collection.results.slice(offset, offset + clampedLimit);

  // Stretch array to clamped limit
  if (results.length < clampedLimit) {
    results.push(...new Array(clampedLimit - results.length));
  }

  return results;
};

const merge = (existing = {}, incoming, { args }) => {
  const offset = args?.offset ?? DEFAULT_OFFSET;
  const limit = args?.limit ?? DEFAULT_LIMIT;

  const merged = { ...existing };

  // Merge totalCount if present
  if (incoming.totalCount !== undefined) {
    merged.totalCount = incoming.totalCount;
  }

  // Synthesize totalCount if missing
  if (merged.totalCount === undefined) {
    // If incoming results are present and less than the limit, we can assume we've hit the last
    // window of results, and calculate the missing totalCount
    if (incoming.results !== undefined && incoming.results.length < limit) {
      merged.totalCount = offset + incoming.results.length;
    }
  }

  // Merge results if present
  if (incoming.results !== undefined) {
    const mergedResults = Array.isArray(existing.results)
      ? existing.results.slice(0)
      : [];

    for (let i = 0; i < incoming.results.length; ++i) {
      mergedResults[offset + i] = incoming.results[i];
    }

    merged.results = mergedResults;
  }

  return merged;
};

const read = (existing, { args, field }) => {
  // Nothing is cached
  if (!existing) {
    return undefined;
  }

  const selectedFields = getSelectedFields(field);
  const response = { ...existing };

  if (selectedFields.includes('totalCount')) {
    // totalCount field is selected, but missing from cache
    if (existing.totalCount === undefined) {
      return undefined;
    }

    response.totalCount = existing.totalCount;
  }

  if (selectedFields.includes('results')) {
    // results field is selected, but missing from cache
    if (existing.results === undefined) {
      return undefined;
    }

    response.results = getCollectionResults(existing, args);

    // Cached collection contains incomplete results
    if (response.results.includes(undefined)) {
      return undefined;
    }
  }

  return response;
};

const collectionPolicy = (...keyArgs) => ({
  keyArgs: keyArgs.length === 0 ? false : keyArgs,
  merge,
  read,
});

export default collectionPolicy;
