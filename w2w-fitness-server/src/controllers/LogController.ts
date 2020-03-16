import express from 'express';
import LogDomain from '../domain/LogDomain';
import Log from '../server/entity/Log';
import { IHttpError } from '../utils/HttpError';

export const LogController = express.Router();

LogController.get('/daily-log', (req, res) => {
    new LogDomain()
        .getAllLogs()
        .then((logs: Log[]) => res.json(logs))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.get('/daily-log/:logId', (req, res) => {
    new LogDomain()
        .getLogByUniqueColumn(req.params.logId)
        .then((log: Log) => res.json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.post('/daily-log', (req, res) => {
    new LogDomain()
        .createLog(req.body as Log)
        .then((log: Log) => res.status(201).json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.put('/daily-log', (req, res) => {
    // new LogDomain().updateLog(req.body as Log)
    //     .then((log: Log) => res.json(log))
    //     .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.delete('/daily-log', (req, res) => {
    // TODO: This needs to acompany a migration / DB change of adding a 'deleted' column, as this data is actually super valuable (vs Terminology, which is pretty disposable)
});
