import express from 'express';
import cors from 'cors';
import config from './config/config';
import AuthRoutes from './routes/AuthRoutes';
import TodoRoutes from './routes/TodoRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',AuthRoutes)
app.use('/api/todos',TodoRoutes)

app.listen(config.PORT, () => console.log(`Server running on http://localhost:${config.PORT}`));