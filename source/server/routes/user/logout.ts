import * as express from 'express';
import {IRequestSession} from "../typings";
import {Application} from "express";
import {sendResponse} from "../routes.utils";

export const logoutRouter = ((req: IRequestSession, res: express.Response, next: express.NextFunction) => {
    req.session.destroy((err: Error) => {
        if (err) return next(err);
        sendResponse(res, {status: 200,  message: "Success Destroy"});
    });
}) as Application;
