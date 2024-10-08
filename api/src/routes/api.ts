import express from 'express';
import { frameworks } from '../data/frameworks';
import { vcisoTasks } from '../data/vcisoTasks'; // You'll need to create this file

const router = express.Router();

router.get('/frameworks', (req, res) => {
  res.json(frameworks);
});

router.get('/vciso-tasks', (req, res) => {
  res.json(vcisoTasks);
});

export default router;
