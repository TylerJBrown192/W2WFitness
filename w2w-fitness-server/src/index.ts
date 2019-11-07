import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import typeOrmConfig from './server/config';


// Configure Server
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());


// Routes
// TODO: Break routes out per model once Terminology is feature complete
app.get('/terminology', (req, res) => {
    res.send('dj khaled anotha one');
});

app.post('/terminology', (req, res) => {
    res.json('another');
});


// Init Server
createConnection(typeOrmConfig).then((connection) => {

    app.listen(process.env.PORT || 3001, () => {
        console.log(`Server is listening on port ${process.env.PORT || 3001}`);
    });
}).catch((error) => console.log('typeorm createConnection error: ', error));
