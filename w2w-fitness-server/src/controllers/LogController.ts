import express from 'express';
import LogDomain from '../domain/LogDomain';
import Log from '../server/entity/Log';
import { IHttpError } from '../utils/HttpError';

export const LogController = express.Router();

LogController.get('/daily-log', (req, res) => {
    new LogDomain()
        .getAllLogs()
        .then((logs: Log[]) => res.json(logs))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e })); // TODO: check Error instanceof here and return applicable status code
});

LogController.get('/daily-log/:logId', (req, res) => {
    new LogDomain()
        .getLogByUniqueColumn(req.params.logId)
        // .then((log: Log) => res.json(log))
        .then((log: any) => res.json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e })); // TODO: check Error instanceof here and return applicable status code
});

LogController.post('/daily-log', (req, res) => {
    // TODO: validate Log class model
    console.log('bod', req.body);

    new LogDomain()
        .createLog(req.body as Log)
        .then((log: Log) => res.status(201).json(log))
        .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e })); // TODO: check Error instanceof here and return applicable status code
});

LogController.put('/daily-log', (req, res) => {
    // TODO: validate Log class model && ID
    // new LogDomain().updateLog(req.body as Log)
    //     .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
    //     .catch((e: IHttpError) => res.status(e.status || 400).json({ error: e }));
});

LogController.delete('/daily-log', (req, res) => {
    // TODO: This needs to acompany a migration / DB change of adding a 'deleted' column, as this data is actually super valuable (vs Terminology, which is pretty disposable)
});
