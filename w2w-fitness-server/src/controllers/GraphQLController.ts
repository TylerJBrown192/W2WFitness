import express from 'express';
import graphqlHTTP from 'express-graphql';
import { schema } from './graphql/schema';

export const GraphQLController = express.Router();

GraphQLController.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
}));
