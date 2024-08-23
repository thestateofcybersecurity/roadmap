import express from 'express';
import { frameworks } from '../data/frameworks';

const router = express.Router();

router.get('/frameworks', (req, res) => {
  res.json(frameworks);
});

export default router;
