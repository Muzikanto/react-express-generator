interface IObject {
    [key: string]: any;
}

interface IfetchData<Response> {
    response: Response;
    status: number;
    message: string;
}

export function postFetch<Body = IObject, Response = IObject>(url: string, body?: Body): Promise<IfetchData<Response>> {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(data => data.json())
}

export function getFetch<Body extends IObject, Response = IObject>(url: string, params: Body): Promise<IfetchData<Response>> {
    const urlWithParams = Object.keys(params).reduce((acc: any, key: string) => {
        return acc + `${key}=${params[key]}&`;
    }, url + '?');

    return fetch(urlWithParams, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(data => data.json())
}
