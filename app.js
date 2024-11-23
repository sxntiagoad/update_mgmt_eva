import express, { json } from 'express';
import cors from 'cors';
import { join } from 'path';
import logger from './middleware/logger';
import updateRoutes from './routes/updateRoutes.js';

const app = express();

//middlewares
app.use(cors());
app.use(json());
app.use(logger); //middleware personalizado
// Middleware para servir archivos estáticos
app.use('/public', express.static(join(__dirname, 'public')));

//routes
app.use('/api', updateRoutes);

//ruta base
app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

export default app;