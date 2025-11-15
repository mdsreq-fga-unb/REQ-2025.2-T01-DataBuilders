import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (_req, res) => res.json({ status: 'ok' }));

export default app;