import { Request, Response, NextFunction } from "express";
import { AuthService } from "../domain/services/AuthService";

const authService = new AuthService();

export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
        return next();

    try {
        const newAccessToken = authService.refreshAccessToken(refreshToken);
        if (newAccessToken) {
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true, // protection attaque XSS
                secure: process.env.NODE_ENV === 'production' // disponible que en https en production
            });
        }
        next();
    } catch (error) {
        console.error(error);
    }
};