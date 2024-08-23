import express from 'express';
import { Framework } from '../../../src/types';
import { frameworks } from '../data/frameworks';

const router = express.Router();

router.get('/frameworks', (req, res) => {
  res.json(frameworks);
});

export default router;
