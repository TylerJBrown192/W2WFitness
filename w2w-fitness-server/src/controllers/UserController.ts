import express, { Request, Response } from 'express';
import { UserDomain } from '../domain/UserDomain';
import { User } from '../server/entity/User';
import { IHttpError } from '../utils/HttpError';

export const UserController = express.Router();

UserController.post('/user/create', (req: Request, res: Response) => {
    new UserDomain()
        .createUser(req.body as User)
        .then((createdAt: Date) => res.status(201).json(createdAt))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

UserController.post('/user/login', (req: Request, res: Response) => {
    new UserDomain()
        .login(req.body as { email: string, password: string })
        .then((token: string) => res.json(token))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});
