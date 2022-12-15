const express = require('express');
const { read, readById, addToFile } = require('../utils/fileSystem');
const { validateToken } = require('../middlewares');

const router = express.Router();
const TALKER_REL_PATH = '../talker.json';

router.get('/', async (_req, res) => {
  const talkers = await read(TALKER_REL_PATH);
  return res.status(200).json(talkers);
});

router.post('/', validateToken, async (req, res) => {
  await addToFile(TALKER_REL_PATH, req.body);
  const file = await read(TALKER_REL_PATH);
  const lastUpdated = file[file.length - 1];
  return res.status(201).json(lastUpdated);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readById(TALKER_REL_PATH, id);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

module.exports = router;