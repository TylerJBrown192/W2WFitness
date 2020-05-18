import { Request } from 'express';
import { UnauthorizedError } from 'express-jwt';
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
        async resolve(source: any, args: any, req: Request, info: any) {
            if (!req.user?.userId) { throw new UnauthorizedError('invalid_token', { message: 'Error: Invalid Login' }); }

            return await new LogDomain().getAllLogs(req.user.userId);
        },
    },
    getLogById: {
        type: LogType,
        description: 'Get a single Log by ID',
        args: {
            id: { type: GraphQLInt },
        },
        async resolve(source: any, args: { [id: string]: number }, req: Request, info: any) {
            if (!req.user?.userId) { throw new UnauthorizedError('invalid_token', { message: 'Error: Invalid Login' }); }

            return await new LogDomain().getLogById(req.user.userId, args.id);
        },
    },
};
