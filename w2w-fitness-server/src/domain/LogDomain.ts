import { plainToClass } from 'class-transformer';
import { isValid } from 'date-fns';
import { getRepository, QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import Log from '../server/entity/Log';
import { HttpEntityNotFoundError, HttpError, HttpStatusCode } from '../utils/HttpError';

export default class LogDomain {
    // QUESTION: Can `getRepository` be called in the constructor of this class, or should it be invoked every function call?
    // ANSWER: "You can call getRepository each time. Repository object kind of acts as a singleton." https://github.com/typeorm/typeorm/issues/3879#issuecomment-479689032

    public async getAllLogs(): Promise<Log[]> {
        try {
            const repository = getRepository<Log>(Log);

            const logs = await repository.find();

            return logs;
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                // TODO: More detailed error throwing here & logging
                throw e;
            }
            if (e instanceof QueryFailedError) {
                // TODO: More detailed error throwing here & logging
            }

            throw e;
        }
    }

    public getLogByUniqueColumn(logIdentifier: string): Promise<Log> {
        if (/^\d+$/.test(logIdentifier)) {
            return this.getLogById(parseInt(logIdentifier, 10));
        } else if (isValid(new Date(logIdentifier))) {
            return this.getLogByDate(logIdentifier);
        } else {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid unique identifier for Log given: ${logIdentifier}`);
        }
    }

    public async getLogById(id: number): Promise<Log> {
        if (typeof id !== 'number') {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid ID argument given to getLogById: ${id}`);
        }

        try {
            const repository = getRepository<Log>(Log);

            const log = await repository.findOne(id);

            if (!log) {
                throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, Log, `ID = ${id}`);
            }

            return log;
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                // TODO: More detailed error throwing here & logging
                throw e;
            }
            if (e instanceof QueryFailedError) {
                // TODO: More detailed error throwing here & logging
            }

            throw e;
        }
    }

    public async getLogByDate(date: string): Promise<Log> {
        try {
            const repository = getRepository<Log>(Log);

            // TODO: Though this works back and forth (e.g. Year first (database default) and Month first (American ordering)), I suspect this needs further testing
            const log = await repository.findOne({ where: { date }});

            if (!log) {
                throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, Log, `Date = ${date}`);
            }

            return log;
        } catch (e) {
            if (e instanceof EntityNotFoundError) {
                // TODO: More detailed error throwing here & logging
                throw e;
            }
            if (e instanceof QueryFailedError) {
                // TODO: More detailed error throwing here & logging
            }

            throw e;
        }
    }

    public async createLog(log: Log): Promise<Log> {
        // TODO: validate Log class model
        console.log('bod', log);


        const mappedLog = plainToClass(Log, log);
        console.log('mappedLog', mappedLog);

        const repository = getRepository<Log>(Log);

        const savedLog = await repository.save(mappedLog);

        return savedLog;
    }

    // public updateLog(log: Log) {
        // TODO: validate Log class model
    // }
}
