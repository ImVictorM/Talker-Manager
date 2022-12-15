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

async function updateFile(relativePath, id, updatedData) {
  const file = await read(relativePath);
  const indexToUpdate = file.findIndex((element) => Number(element.id) === Number(id));
  file.splice(indexToUpdate, 1, { id: Number(id), ...updatedData });
  await write(relativePath, file);
}

async function deleteById(relativePath, id) {
  const file = await read(relativePath);
  const updatedFile = file.filter((element) => Number(element.id) !== Number(id));
  await write(relativePath, updatedFile);
}

module.exports = {
  read,
  readById,
  addToFile,
  updateFile,
  deleteById,
};
