import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { LogQueries } from './Log/LogQueries';

const query = new GraphQLObjectType({
    name: 'Query',
    description: 'All GraphQL Queries for the application',
    fields: {
        ...LogQueries,
    },
});

export const schema = new GraphQLSchema({
    query,
});
