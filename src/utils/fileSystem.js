const fs = require('fs/promises');
const path = require('path');

async function read(relativePath) {
  const filePath = path.join(__dirname, relativePath);
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}

module.exports = {
  read,
};
