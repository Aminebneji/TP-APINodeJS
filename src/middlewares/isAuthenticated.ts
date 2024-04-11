import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import env from "../config/env";

import jwt from 'jsonwebtoken';

const { JWT_SECRET } = env;

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        return response(res, { statusCode: 403, message: 'Token missing'});
    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET);
        const { id, pseudo } = decoded as jwt.JwtPayload;

        req.user = { id, pseudo };

        next();
    } catch(err) {
        return response(res, { statusCode: 401, message: 'Unauthorized' });
    }
};