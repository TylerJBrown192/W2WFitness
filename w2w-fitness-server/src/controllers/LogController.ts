import express, { Request, Response } from 'express';
import expressJwt from 'express-jwt';
import { LogDomain } from '../domain/LogDomain';
import { Log } from '../server/entity/Log';
import { IHttpError } from '../utils/HttpError';

export const LogController = express.Router();

LogController.get('/daily-log', expressJwt({ secret: process.env.JWT_SECRET }), (req: Request, res: Response) => {
    new LogDomain()
        .getAllLogs(req.user.userId)
        .then((logs: Log[]) => res.json(logs))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.get('/daily-log/:logId', expressJwt({ secret: process.env.JWT_SECRET }), (req: Request, res: Response) => {
    new LogDomain()
        .getLogByUniqueColumn(req.user.userId, req.params.logId)
        .then((log: Log) => res.json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.post('/daily-log', expressJwt({ secret: process.env.JWT_SECRET }), (req: Request, res: Response) => {
    new LogDomain()
        .createLog(req.user.userId, req.body as Log)
        .then((log: Log) => res.status(201).json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.put('/daily-log', expressJwt({ secret: process.env.JWT_SECRET }), (req: Request, res: Response) => {
    // new LogDomain().updateLog(req.body as Log)
    //     .then((log: Log) => res.json(log))
    //     .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.delete('/daily-log', expressJwt({ secret: process.env.JWT_SECRET }), (req: Request, res: Response) => {
    // TODO: This needs to acompany a migration / DB change of adding a 'deleted' column, as this data is actually super valuable (vs Terminology, which is pretty disposable)
});
