import {
    GraphQLInt,
    GraphQLList,
  } from 'graphql';
import { LogDomain } from '../../../domain/LogDomain';
import { LogType } from './LogType';

export const LogQueries = {
    getAllLogs: {
        type: new GraphQLList(LogType),
        description: 'Get all Logs',
        async resolve() {
            try {
                return await new LogDomain().getAllLogs();
            } catch (e) {
                throw new Error(e);
            }
        },
    },
    getLogById: {
        type: LogType,
        description: 'Get a single Log by ID',
        args: {
            id: { type: GraphQLInt },
        },
        async resolve(source: any, args: { [id: string]: number }, context: any, info: any) {
            try {
                return await new LogDomain().getLogById(args.id);
            } catch (e) {
                throw new Error(e);
            }
        },
    },
};
