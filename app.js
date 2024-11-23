const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./middleware/logger');
const updateRoutes = require('./routes/updateRoutes');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(logger); //middleware personalizado

// Middleware para servir archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', updateRoutes);

//ruta base
app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

module.exports = app;