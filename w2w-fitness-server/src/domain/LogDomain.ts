import { getRepository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import Log from '../server/entity/Log';

export class LogDomain {

    public async getLog(id: number): Promise<Log> {
        // TODO: Assume model validation has already happened by this point

        // TODO: Can `getRepository` be called in the constructor of this class, or should it be invoked every function call?
        // "You can call getRepository each time. Repository object kind of acts as a singleton." https://github.com/typeorm/typeorm/issues/3879#issuecomment-479689032
        const repository = getRepository(Log);
        let log: Log | undefined;

        try {
            log = await repository.findOne(id);

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

    public createLog() {

    }

    public updateLog() {

    }
}
