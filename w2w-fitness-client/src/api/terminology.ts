import { fetchBase, HttpMethods } from "./config";

interface CreateTerm {
    name: string,
    definition: string,
}

const fetchTerminology = fetchBase('terminology');

export const createTerminology = async (termForm: CreateTerm) => {
    const createdTerm = await fetchTerminology({ method: HttpMethods.POST, body: termForm })

    return createdTerm;
}

export const getAllTerminology = () => {

    return true;
}
