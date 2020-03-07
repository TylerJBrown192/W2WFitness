import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import LogController from './controllers/LogController';
import TerminologyController from './controllers/TerminologyController';
import typeOrmConfig from './server/config';
import expressGraphql from 'express-graphql';


// Configure Server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(TerminologyController);
app.use(LogController);
// app.use('/graphql', expressGraphql({

// }))


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
