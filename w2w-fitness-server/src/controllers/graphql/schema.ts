import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type Log {
        id: Int
        date: String
        weight: Float
    }

    type RootQuery {
        hello: TestData!
        getAllLogs: [Log!]
    }

    schema {
        query: RootQuery
    }
`);

export default schema;


// sleepHours: number;
// emotionalRating: number;
// physicalRating: number;
// notes: string;
// calories: number;
// fatGrams: number;
// carbohydrateGrams: number;
// proteinGrams: number;
// createdAt: Date;
// updatedAt: Date;
