import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/', apiRoutes);

app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});

export default app;
