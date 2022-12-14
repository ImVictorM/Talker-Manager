const fs = require('fs/promises');
const path = require('path');

async function read(relativePath) {
  const filePath = path.join(__dirname, relativePath);
  const file = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(file);
}

async function readById(relativePath, id) {
  const file = await read(relativePath);
  const requested = file.find((element) => Number(element.id) === Number(id));
  return requested;
}

module.exports = {
  read,
  readById,
};
