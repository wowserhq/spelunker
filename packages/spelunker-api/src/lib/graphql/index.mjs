// This is required to work around co-existing CJS and ESM packages
// See: https://github.com/graphql/express-graphql/issues/425
// And: https://github.com/apollographql/apollo-server/issues/1035
import graphql from './cjs-export.js';

const {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLUnionType,
} = graphql;

export {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLUnionType,
};
