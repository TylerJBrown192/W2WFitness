import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import { LogDomain } from './domain/LogDomain';
import typeOrmConfig from './server/config';
import Log from './server/entity/Log';

// Configure Server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/terminology', (req, res) => {
  res.send({ test: 'GET terminology' });
});

app.post('/terminology', (req, res) => {
  res.json('POST terminology');
});

app.get('/daily-log', (req, res) => {
  // TODO: This just `new`s up an object and immediately discards it on reqeust
  // Would creating a constant in `index.ts` for the Domain class(es) be better design? How would this interfere with the `getRepository` typeORM pattern?
  new LogDomain()
    .getAllLogs()
    .then((logs: Log[]) => res.json(logs)) // TODO: 200 HTTP status - Does it line up with RESTful API design?
    .catch((ex: Error) => res.status(400).json({ error: ex })); // TODO: check Error instanceof here and return applicable status code
});

app.get('/daily-log/:id', (req, res) => {
  // TODO: validate ID in query params
  new LogDomain()
    .getLogById(req.query.id)
    .then((log: Log) => res.json(log)) // TODO: 200 HTTP status - Does it line up with RESTful API design?
    .catch((ex: Error) => res.status(400).json({ error: ex })); // TODO: check Error instanceof here and return applicable status code
});

app.post('/daily-log', (req, res) => {
  // TODO: validate Log class model

  console.log('bod', req.body);

  new LogDomain()
    .createLog(req.body as Log)
    .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
    .catch((ex: Error) => res.status(400).json({ error: ex }));
});

app.put('/daily-log', (req, res) => {
  // TODO: validate Log class model && ID
  // new LogDomain().updateLog(req.body as Log)
  //     .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
  //     .catch((ex: Error) => res.status(400).json({ error: ex }));
});

app.delete('/daily-log', (req, res) => {
  // TODO: This needs to acompany a migration / DB change of adding a 'deleted' column, as this data is actually super valuable (vs Terminology, which is pretty disposable)
});

// Init Server
createConnection(typeOrmConfig)
  .then((connection) => {
    // console.log('conn', connection);

    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is listening on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((error) =>
    console.log('typeorm createConnection error: ', error, typeOrmConfig),
  );
