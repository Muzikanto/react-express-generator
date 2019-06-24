import * as express from 'express';

export interface IUserSession {
    id: number;
    email: string;
    nick: string;
}

export interface ISession extends Express.Session {
    user: IUserSession | null;
    destroy: (v: any) => void;

    id: string;
}

export interface IRequestSession extends express.Request {
    user: IUserSession | null;
    session: ISession;
}
