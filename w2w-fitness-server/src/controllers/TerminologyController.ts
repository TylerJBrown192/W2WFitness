import express, { Request, Response } from 'express';

export const TerminologyController = express.Router();

TerminologyController.get('/terminology', (req: Request, res: Response) => {
    res.send({ test: 'GET terminology' });
  });

TerminologyController.post('/terminology', (req: Request, res: Response) => {
    res.json('POST terminology');
  });
