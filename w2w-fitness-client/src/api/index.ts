import Log from "../../../w2w-fitness-server/src/server/entity/Log";

interface CreateTerm {
    name: string,
    definition: string,
}

export const createTerminology = async (termForm: CreateTerm) => {

    const data = await fetch('http://localhost:3001/terminology', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const parsedData = await data.json();

    return parsedData;
}

export const getAllTerminology = () => {

    return true;
}

export const getAllLogs = async (): Promise<Log[]> => {

    const data = await fetch('http://localhost:3001/daily-log', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const parsedData = await data.json() as Log[]; // TODO: is casting (and thus clobbering the TS parser) the best method here? Research better fetch / typescript patterns

    return parsedData;
}

export const getLogById = async (id: number | string) => {
    const fetchLog = await fetch(`http://localhost:3001/daily-log/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const log = await fetchLog.json();

    if (!fetchLog.ok) {
        throw log.error;
    }

    return log;
}

export const createLog = async (log: Partial<Log>): Promise<Log> => {

    const data = await fetch('http://localhost:3001/daily-log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(log)
    });

    const parsedData = await data.json() as Log; // TODO: is casting (and thus clobbering the TS parser) the best method here? Research better fetch / typescript patterns

    return parsedData;
}
