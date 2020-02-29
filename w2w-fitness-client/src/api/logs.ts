import Log from "../../../w2w-fitness-server/src/server/entity/Log";
import { HttpMethods, fetchBase } from "./config";

const fetchLogs = fetchBase('daily-log');

export const getAllLogs = async (): Promise<Log[]> => {
    const logs = await fetchLogs({ method: HttpMethods.GET }) as Log[];

    return logs;
}

export const getLogById = async (id: number | string): Promise<Log> => {
    const log = await fetchLogs({ method: HttpMethods.GET, urlParam: id }) as Log;

    return log;
}

export const createLog = async (log: Partial<Log>): Promise<Log> => {
    const createdLog = await fetchLogs({ method: HttpMethods.POST, body: log }) as Log;

    return createdLog;
}

// A comment on my usage of casting in this file / project:
// https://github.com/Microsoft/TSJS-lib-generator/pull/622#issuecomment-455695382
// "Since Typescript doesn't have type information at runtime, an explicit type parameter is basically the same as a cast. You're not really providing more information with an explicit type parameter compared to a cast. The annotation is also more local"
