import { getRepository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { plainToClass } from "class-transformer";
import Log from '../server/entity/Log';

export class LogDomain {

    public getAllLogs() {

    }

    public async getLogById(id: number): Promise<Log> {
        // TODO: Assume id / int validation has already happened by this point

        // TODO: Can `getRepository` be called in the constructor of this class, or should it be invoked every function call?
        // "You can call getRepository each time. Repository object kind of acts as a singleton." https://github.com/typeorm/typeorm/issues/3879#issuecomment-479689032
        const repository = getRepository(Log);
        let log: Log | undefined;

        try {
            log = await repository.findOne(id);

            // TODO: this might be a Promise<undefined>, then this won't work - test
            if (!log) {
                throw new EntityNotFoundError(Log, 'I am throwing this error on my own');
            }
        } catch (ex) {
            if (ex instanceof EntityNotFoundError) {
                // TODO: Find better error handling / throwing return pattern?
                throw ex;
            }
        }

        return log as Log; // TODO: this is kind of clobbering the TS linter... is there a better way to confirm that 'log' is truthy at this point?
    }

    public getLogByDate(date: string) {
        // TODO: Assume date / format validation has already happened by this point
    }

    public async createLog(log: Log): Promise<Log> {
        // const test = new Log();
        // console.log('log', log);

        const mappedLog = plainToClass(Log, log);
        console.log('mappedLog', mappedLog);

        const repository = getRepository(Log);

        const test = await repository.save(mappedLog);

        return test;
    }

    public updateLog(log: Log) {

    }
}
