import { Request, Response } from 'express';
import env from '../../../config/env';
import bcrypt from 'bcrypt';

import { UserRepository } from '../../repositories/UserRepository';
import { AuthService } from '../../../domain/services/AuthService';

import { response } from '../../../utils/response';

const { NODE_ENV } = env;

const userRepository = new UserRepository();
const authService = new AuthService();

export const login = async (req: Request, res: Response) => {
    try {
        const { pseudo, password } = req.body;

        const user = userRepository.getUserByPseudo(pseudo);
        if (!user)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid)
            return response(res, { statusCode: 401, message: 'Authentication failed' });

        const accessToken = authService.issueAccessToken(user.id as string);
        const refreshToken = authService.issueRefreshToken(user.id as string);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: NODE_ENV === 'production'
        });

        response(res, { statusCode: 200, message: 'Authentication successful' });
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error' });
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { pseudo, firstname, lastname, password } = req.body;

        //console.log(req.body);

        if (!pseudo?.trim() || !firstname?.trim() || !lastname?.trim() || !password?.trim())
            return response(res, { statusCode: 400, message: 'Invalid typing, please redo' });

        //je ne vérifie pas l'éxistance d'un Fname ou Lname présent en DB car plusieurs personnes peuvent avoir le même nom
        const existingUsername = userRepository.getUserByPseudo(pseudo);
        if (existingUsername)
            return response(res, { statusCode: 409, message: 'Username already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        userRepository.createUser({ pseudo, firstname, lastname,  password: hashedPassword });
        response(res, {statusCode: 201, message: 'User created successfully'});
    } catch(error) {
        console.error(error);
        response(res, {statusCode: 500, message: 'Internal server error'})
    }
}