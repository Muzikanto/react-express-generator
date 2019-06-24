import * as express from 'express';
import {Application} from 'express';
import {IRequestSession} from "../typings";
import {sendResponse} from "../routes.utils";
import {UserRegister} from "../../models/user";
import {IUser} from "../../models/user/user.typings";

export interface IregisterRouterQuery {
    nick: string,
    email: string,
    password: string,
    password2: string
}

export type IregisterRouterResponse = IUser;

export const registerRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body as IregisterRouterQuery;

    try {
        const user = await UserRegister(nick, email, password);

        req.session.user = user;
        sendResponse<IregisterRouterResponse>(res, {status: 200, message: `Success Register`, response: user});
    } catch (err) {
        sendResponse(res, {status: err.status, message: err.message});
    }
}) as Application;

