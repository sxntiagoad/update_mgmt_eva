const path = require('path');
const fs = require('fs').promises;

const getLatestUpdate = async (req, res) => {
  try {
    const jsonPath = path.join(__dirname, '../public/updates/latest.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la actualización' });
  }
};

const downloadApk = (req, res) => {
  const apkPath = path.join(__dirname, '../public/apk/app-release.apk');
  res.download(apkPath);
};

export default {
  getLatestUpdate,
  downloadApk
};