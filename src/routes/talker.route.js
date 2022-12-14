const express = require('express');
const { read, readById } = require('../utils/fileSystem');
const { validateTalker } = require('../middlewares');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await read('../talker.json');
  return res.status(200).json(talkers);
});

router.post('/', validateTalker, (_req, _res) => {
  
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await readById('../talker.json', id);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

module.exports = router;