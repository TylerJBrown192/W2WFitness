import express from 'express';

export const TerminologyController = express.Router();

TerminologyController.get('/terminology', (req, res) => {
    res.send({ test: 'GET terminology' });
  });

TerminologyController.post('/terminology', (req, res) => {
    res.json('POST terminology');
  });
