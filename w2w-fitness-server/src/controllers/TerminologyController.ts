import express from 'express';

const router = express.Router();

router.get('/terminology', (req, res) => {
    res.send({ test: 'GET terminology' });
  });

router.post('/terminology', (req, res) => {
    res.json('POST terminology');
  });

export default router;
