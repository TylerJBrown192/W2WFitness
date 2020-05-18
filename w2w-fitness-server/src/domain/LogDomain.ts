import { plainToClass } from 'class-transformer';
import { isValid } from 'date-fns';
import { getRepository, QueryFailedError } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { Log } from '../server/entity/Log';
import { HttpEntityNotFoundError, HttpError, HttpStatusCode } from '../utils/HttpError';

export class LogDomain {
    // QUESTION: Can `getRepository` be called in the constructor of this class, or should it be invoked every function call?
    // ANSWER: "You can call getRepository each time. Repository object kind of acts as a singleton." https://github.com/typeorm/typeorm/issues/3879#issuecomment-479689032

    public async getAllLogs(userId: number): Promise<Log[]> {
        try {
            const repository = getRepository<Log>(Log);

            return await repository.find();
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

    public getLogByUniqueColumn(userId: number, logIdentifier: string): Promise<Log> {
        if (/^\d+$/.test(logIdentifier)) {
            return this.getLogById(userId, parseInt(logIdentifier, 10));
        } else if (isValid(new Date(logIdentifier))) {
            return this.getLogByDate(userId, logIdentifier);
        } else {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid unique identifier for Log given: ${logIdentifier}`);
        }
    }

    public async getLogById(userId: number, id: number): Promise<Log> {
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

    public async getLogByDate(userId: number, date: string): Promise<Log> {
        if (!isValid(new Date(date))) {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid Date argument given to getLogByDate: ${date}`);
        }

        try {
            const repository = getRepository<Log>(Log);

            // TODO: Though this works in two date formats, I suspect this needs further testing
            // Year first (database default: YYYY-MM-DD)
            // Month first (American ordering: MM-DD-YYYY)
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

    public async createLog(userId: number, log: Log): Promise<Log> {
        // TODO: validate Log class model

        const mappedLog = plainToClass(Log, log);
        console.log('mappedLog', mappedLog);

        const repository = getRepository<Log>(Log);

        return await repository.save(mappedLog);
    }

    // public updateLog(log: Log) {
        // TODO: validate Log class model
    // }
}
