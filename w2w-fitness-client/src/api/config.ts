// Eventually we'll be grabbing this from some env / config, but for now, here it is lol
const API_URL = 'http://localhost:3001';

export const fetchBase = (apiRoute: string) => async ({
    method,
    urlParam = '',
    body,
}: {
    method: HttpMethods;
    urlParam?: string | number;
    body?: any;
}) => {
    const response = await fetch(`${API_URL}/${apiRoute}/${urlParam}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: body && JSON.stringify(body),
    })

    const parsedResponse = await response.json();

    if (!response.ok) {
        throw parsedResponse.error;
    }

    return parsedResponse;
}

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST'
}