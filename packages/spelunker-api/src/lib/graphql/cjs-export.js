// This is required to work around co-existing CJS and ESM packages
// See: https://github.com/graphql/express-graphql/issues/425
// And: https://github.com/apollographql/apollo-server/issues/1035
module.exports = require('graphql');
