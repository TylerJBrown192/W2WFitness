import express from 'express';
import graphqlHTTP from 'express-graphql';
import expressJwt from 'express-jwt';
import { schema } from './graphql/schema';


export const GraphQLController = express.Router();

GraphQLController.use('/graphql', expressJwt({ secret: process.env.JWT_SECRET, credentialsRequired: false }), graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production',
}));
