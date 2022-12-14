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

async function write(relativePath, dataToWrite) {
  const filePath = path.join(__dirname, relativePath);
  await fs.writeFile(filePath, JSON.stringify(dataToWrite, null, 2));
}

async function addToFile(relativePath, newData) {
  const file = await read(relativePath);
  const { name, age, talk } = newData;
  const newIndex = file[file.length - 1].id + 1;

  const updatedData = {
    name,
    age,
    id: newIndex,
    talk,
  };
  file.push(updatedData);

  await write(relativePath, file);
}

module.exports = {
  read,
  readById,
  addToFile,
};
