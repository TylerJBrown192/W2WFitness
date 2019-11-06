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