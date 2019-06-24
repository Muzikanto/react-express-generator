import * as express from 'express';

export function sendResponse<Response extends { [key: string]: any }>(res: express.Response, data: ISendData<Response>) {
    res.status(data.status).send(JSON.stringify(data));
}

export interface ISendData<Response> {
    status: number;
    message: string;
    response?: Response;
}
