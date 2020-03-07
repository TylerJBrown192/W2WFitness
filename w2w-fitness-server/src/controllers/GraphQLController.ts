import express from 'express';
import graphqlHTTP from 'express-graphql';
import resolver from './graphql/resolvers';
import schema from './graphql/schema';

export const GraphQLController = express.Router();

GraphQLController.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolver,
    graphiql: process.env.NODE_ENV !== 'production',
}));
