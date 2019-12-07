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
    res.send('GET terminology');
});

app.post('/terminology', (req, res) => {
    res.json('POST terminology');
});

app.get('/daily-log', (req, res) => {
    // const logDomain = new LogDomain();
    // logDomain.getLog(req.query.id)
    new LogDomain().getLog(req.query.id)
        .then((log: Log) => res.json(log)) // TODO: What HTTP code does this return? Does it line up with RESTful API design?
        .catch((ex: Error) => res.status(400).json({ error: ex }));
});

app.post('/daily-log', (req, res) => {
    res.json('POST daily log');
});

app.put('/daily-log', (req, res) => {
    res.json('PUT daily log');
});

// Init Server
createConnection(typeOrmConfig).then((connection) => {
    console.log('conn', connection);
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3001}`);
    });
}).catch((error) => console.log('typeorm createConnection error: ', error, typeOrmConfig));
