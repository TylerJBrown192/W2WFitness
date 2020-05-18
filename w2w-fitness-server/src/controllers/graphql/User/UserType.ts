import { GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';

export const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'A User within the application',
    fields: {
        // id: { type: GraphQLInt },
        // date: { type: GraphQLString },
        // weight: { type: GraphQLFloat },
        // sleepHours: { type: GraphQLFloat },
        // emotionalRating: { type: GraphQLInt },
        // physicalRating: { type: GraphQLInt },
        // notes: { type: GraphQLString },
        // calories: { type: GraphQLFloat },
        // fatGrams: { type: GraphQLFloat },
        // carbohydrateGrams: { type: GraphQLFloat },
        // proteinGrams: { type: GraphQLFloat },
        // createdAt: { type: GraphQLDateTime },
        // updatedAt: { type: GraphQLDateTime },
    },
});
