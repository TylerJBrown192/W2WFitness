import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import typeOrmConfig from './server/config';


// Configure Server
const app = express();
app.use(bodyParser.json());
app.use(cors());


// Routes
// TODO: Break routes out per model once Terminology is feature complete
app.get('/terminology', (req, res) => {
    res.send('GET terminology');
});

app.post('/terminology', (req, res) => {
    res.json('POST terminology');
});

app.get('/daily-log', (req, res) => {
    res.send('GET daily log');
});

app.post('/daily-log', (req, res) => {
    res.json('POST daily log');
});

// Init Server
createConnection(typeOrmConfig).then((connection) => {
    console.log('conn', connection);
    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3001}`);
    });
}).catch((error) => console.log('typeorm createConnection error: ', error, typeOrmConfig));
