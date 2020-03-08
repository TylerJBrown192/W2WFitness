import {
    GraphQLList,
    GraphQLNonNull,
  } from 'graphql';
import LogDomain from '../../../domain/LogDomain';
//   import { getUsers } from '../../operations/users-operations';
//   import User from './UserType';
//   import UserRoleEnum from './UserRoleEnumType';

const LogQueries = {
    async getAllLogs() {
        // try {
            throw new Error('hi im here');
            // const logs = await new LogDomain().getAllLogs();
            // return logs;
        // } catch (e) {

        // }
    },
    async getLogById(id: number) {
        const log = await new LogDomain().getLogById(id);
        return log;
    },
    // users: {
    //   type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(User))),
    //   args: {
    //     role: {
    //       type: UserRoleEnum,
    //     },
    //   },
    //   resolve: (_source, { role }) => {
    //     const result = getUsers();
    //     if (role != null) {
    //       return result.filter((user) => user.role === role);
    //     }
    //     return result;
    //   },
    // },
  };

export default LogQueries;
