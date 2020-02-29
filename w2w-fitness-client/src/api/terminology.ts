import { fetchBase, HttpMethods } from './config';
import Terminology from '../../../w2w-fitness-server/src/server/entity/Terminology';

interface CreateTerm {
    name: string;
    definition: string;
}

const fetchTerminology = fetchBase('terminology');

export const createTerminology = async (termForm: CreateTerm): Promise<Terminology> => {
    const createdTerm = (await fetchTerminology({ method: HttpMethods.POST, body: termForm })) as Terminology;

    return createdTerm;
};
