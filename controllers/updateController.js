import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getLatestUpdate = async (req, res) => {
  try {
    const jsonPath = join(__dirname, '../public/updates/latest.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actualización' });
  }
};

export const downloadApk = (req, res) => {
  const driveId = '1jIll6FkZO085NPtmTSqWQybofr8YK3tu';
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveId}&confirm=t`;
  res.redirect(downloadUrl);
};

export default {
  getLatestUpdate,
  downloadApk
};