import { plainToClass } from 'class-transformer';
import { isValid } from 'date-fns';
import { getRepository } from 'typeorm';
import { Log } from '../server/entity/Log';
import { User } from '../server/entity/User';
import { HttpEntityNotFoundError, HttpError, HttpStatusCode } from '../utils/HttpError';

export class LogDomain {
    // QUESTION: Can `getRepository` be called in the constructor of this class, or should it be invoked every function call?
    // ANSWER: "You can call getRepository each time. Repository object kind of acts as a singleton." https://github.com/typeorm/typeorm/issues/3879#issuecomment-479689032

    public async getAllLogs(userId: number): Promise<Log[]> {
        const repository = getRepository<Log>(Log);

        /*
            Even though this syntax might suggest a query into / join with the `User` table, TypeORM queries on the Log.userId property
            Which is automatically generated when declaring a OneToMany relationship - I've manually declared this property within the Log model for clarity

            Syntactically different, but produces the same end result: respository.find({ userId })

            SQL query generated:
            FROM "log" "Log" WHERE "Log"."userId" = $1
        */
        return await repository.find({ user: { id: userId } });
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

    public async getLogById(userId: number, logId: number): Promise<Log> {
        if (typeof logId !== 'number') {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid ID argument given to getLogById: ${logId}`);
        }

        const repository = getRepository<Log>(Log);

        const log = await repository.findOne({ where: { id: logId, user: { id: userId }}});

        if (!log) {
            throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, Log, `ID = ${logId}`);
        }

        return log;
    }

    public async getLogByDate(userId: number, date: string): Promise<Log> {
        if (!isValid(new Date(date))) {
            throw new HttpError(HttpStatusCode.UNPROCESSABLE_ENTITY, `Invalid Date argument given to getLogByDate: ${date}`);
        }

        const repository = getRepository<Log>(Log);

        // TODO: Though this works in the following two date formats, I suspect this needs further testing
        // Year first (database default: YYYY-MM-DD)
        // Month first (American ordering: MM-DD-YYYY)
        const log = await repository.findOne({ where: { date, user: { id: userId } }});

        if (!log) {
            throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, Log, `Date = ${date}`);
        }

        return log;
    }

    public async createLog(userId: number, log: Log): Promise<Log> {
        // TODO: validate Log class model

        const mappedLog = plainToClass(Log, log);

        const userRepository = getRepository<User>(User);
        const foundUser = await userRepository.findOne(userId);
        if (!foundUser) {
            throw new HttpEntityNotFoundError(HttpStatusCode.NOT_FOUND, User, `User not found`);
        }

        mappedLog.userId = userId;
        const repository = getRepository<Log>(Log);
        return await repository.save(mappedLog);
    }

    // public updateLog(log: Log) {
        // TODO: validate Log class model
    // }
}
