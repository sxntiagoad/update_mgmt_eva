import express, { json } from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import updateRoutes from './routes/updateRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//middlewares
app.use(cors());
app.use(json());
app.use(logger);
app.use('/public', express.static(join(__dirname, 'public')));

//routes
app.use('/api', updateRoutes);

//ruta base
app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

export default app;