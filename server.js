import { config } from 'dotenv';
import app from './app.js';

config(); // Inicializa dotenv correctamente

const PORT = process.env.PORT || 3000;

//inicializa el server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});