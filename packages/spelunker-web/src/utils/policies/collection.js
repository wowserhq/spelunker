import { getSelectedFields } from '../graphql';

const getCollectionResults = (args, collection) => {
  // Use total if known, otherwise assume results match total
  const total = collection.totalCount ?? collection.results.length;

  const defaultOffset = 0;
  const offset = args?.offset ?? defaultOffset;

  const defaultLimit = 25;
  const limit = Math.min(args?.limit ?? defaultLimit, total - offset);

  const results = collection.results.slice(offset, offset + limit);

  // Stretch array to permissable limit
  if (results.length < limit) {
    results.push(...new Array(limit - results.length));
  }

  return results;
};

const collectionPolicy = ({ keyArgs = false } = {}) => ({
  keyArgs,

  merge: (existing, incoming, { args }) => {
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

      const defaultOffset = 0;
      const offset = args?.offset ?? defaultOffset;

      for (let i = 0; i < incoming.results.length; ++i) {
        mergedResults[offset + i] = incoming.results[i];
      }

      merged.results = mergedResults;
    }

    return merged;
  },

  read: (existing, { args, field }) => {
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
  },
});

export default collectionPolicy;
