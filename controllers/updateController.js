import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configurar el cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const getLatestUpdate = async (req, res) => {
  try {
    const jsonPath = join(__dirname, '../public/updates/latest.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actualización' });
  }
};

export const downloadApk = async (req, res) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: 'app-release.apk'
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="app-release.apk"');
    
    const response = await fetch(signedUrl);
    response.body.pipe(res);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al descargar el APK' });
  }
};

export default {
  getLatestUpdate,
  downloadApk
};