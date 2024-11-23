import { Router } from 'express';
import { getLatestUpdate, downloadApk } from '../controllers/updateController.js';
const router = Router();


// Ruta para obtener la información de la última actualización
router.get('/updates/latest', getLatestUpdate);

// Ruta para descargar el APK
router.get('/updates/download', downloadApk);

export default router;
