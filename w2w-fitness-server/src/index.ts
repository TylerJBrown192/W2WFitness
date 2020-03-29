import dotenv from 'dotenv';
import 'reflect-metadata';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import {
    GraphQLController,
    LogController,
    TerminologyController,
    UserController,
} from './controllers';
import typeOrmConfig from './server/config';


// Configure Server
const app = express();
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use(GraphQLController);
app.use(TerminologyController);
app.use(LogController);
app.use(UserController);


// Init Server
createConnection(typeOrmConfig)
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is listening on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((error) =>
    console.log('typeorm createConnection error: ', error, typeOrmConfig),
  );
