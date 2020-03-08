import express from 'express';
import graphqlHTTP from 'express-graphql';
import LogQueries from './graphql/Log/LogQueries';
import schema from './graphql/schema';

export const GraphQLController = express.Router();

// tslint:disable: object-literal-sort-keys
GraphQLController.use('/graphql', graphqlHTTP({
    schema,
    rootValue: {
        ...LogQueries,
    },
    graphiql: process.env.NODE_ENV !== 'production',
}));
