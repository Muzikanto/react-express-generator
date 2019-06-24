import * as express from 'express';
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IregisterRouterResponse} from "./register";
import {UserAuthorize} from "../../models/user";
import {sendResponse} from "../routes.utils";
import {IUser} from "../../models/user/user.typings";

export interface IloginRouterQuery {
    email: string;
    password: string;
}

export type IloginRouterResponse = IUser;

export const loginRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {password, email} = req.body as IloginRouterQuery;

    try {
        const user = await UserAuthorize(email, password);

        req.session.user = user;
        sendResponse<IregisterRouterResponse>(res, {status: 200, message: 'Success Authorize', response: user});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
