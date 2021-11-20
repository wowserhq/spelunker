import { getSelectedFields } from '../graphql';

const DEFAULT_OFFSET = 0;
const DEFAULT_LIMIT = 25;

const getCollectionResults = (args, collection) => {
  // Use total if known, otherwise assume results match total
  const total = collection.totalCount ?? collection.results.length;

  const offset = args?.offset ?? DEFAULT_OFFSET;
  const limit = Math.min(args?.limit ?? DEFAULT_LIMIT, total - offset);

  const results = collection.results.slice(offset, offset + limit);

  // Stretch array to permissable limit
  if (results.length < limit) {
    results.push(...new Array(limit - results.length));
  }

  return results;
};

const merge = (existing, incoming, { args }) => {
  // If nothing was cached, no merge needs to happen (yet)
  if (!existing) {
    return incoming;
  }

  const merged = { ...existing };

  // Merge totalCount if present
  if (incoming.totalCount !== undefined) {
    merged.totalCount = incoming.totalCount;
  }

  // Merge results if present
  if (incoming.results !== undefined) {
    const mergedResults = Array.isArray(existing.results)
      ? existing.results.slice(0)
      : [];

    const offset = args?.offset ?? DEFAULT_OFFSET;

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

    response.results = getCollectionResults(args, existing);

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
