import express from 'express';
import LogDomain from '../domain/LogDomain';
import Log from '../server/entity/Log';

const router = express.Router();

router.get('/daily-log', (req, res) => {
    // TODO: This just `new`s up an object and immediately discards it on reqeust
    // Would creating a constant in `index.ts` for the Domain class(es) be better design? How would this interfere with the `getRepository` typeORM pattern?
    new LogDomain()
      .getAllLogs()
      .then((logs: Log[]) => res.json(logs)) // TODO: 200 HTTP status - Does it line up with RESTful API design?
      .catch((ex: Error) => res.status(400).json({ error: ex })); // TODO: check Error instanceof here and return applicable status code
  });

router.get('/daily-log/:id', (req, res) => {
    // TODO: validate ID in query params
    console.log(req.params);
    new LogDomain()
      .getLogById(parseInt(req.params.id, 10))
      .then((log: Log) => res.json(log)) // TODO: 200 HTTP status - Does it line up with RESTful API design?
      .catch((ex: Error) => res.status(400).json({ error: ex })); // TODO: check Error instanceof here and return applicable status code
  });

router.post('/daily-log', (req, res) => {
    // TODO: validate Log class model

    console.log('bod', req.body);

    new LogDomain()
      .createLog(req.body as Log)
      .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
      .catch((ex: Error) => res.status(400).json({ error: ex }));
  });

router.put('/daily-log', (req, res) => {
    // TODO: validate Log class model && ID
    // new LogDomain().updateLog(req.body as Log)
    //     .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
    //     .catch((ex: Error) => res.status(400).json({ error: ex }));
  });

router.delete('/daily-log', (req, res) => {
    // TODO: This needs to acompany a migration / DB change of adding a 'deleted' column, as this data is actually super valuable (vs Terminology, which is pretty disposable)
  });

export default router;
