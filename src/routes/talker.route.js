const express = require('express');
const { read, readById, addToFile, updateFile, deleteById } = require('../utils/fileSystem');
const { 
  validateToken, 
  validateReqProps,
  validatePersonalInfo,
  validateTalkInfo,
} = require('../middlewares');

const router = express.Router();
const TALKER_REL_PATH = '../talker.json';

router.get('/', async (_req, res) => {
  const talkers = await read(TALKER_REL_PATH);
  return res.status(200).json(talkers);
});

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await read(TALKER_REL_PATH);
  const reqTalkers = talkers.filter((talker) => talker.name.includes(q));
  return res.status(200).json(reqTalkers);
});

router.post(
  '/', 
  validateToken, 
  validateReqProps,
  validatePersonalInfo,
  validateTalkInfo,
  async (req, res) => {
    await addToFile(TALKER_REL_PATH, req.body);
    const file = await read(TALKER_REL_PATH);
    const lastUpdated = file[file.length - 1];
    return res.status(201).json(lastUpdated);
  },
);

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

router.put(
  '/:id', 
  validateToken, 
  validateReqProps, 
  validatePersonalInfo, 
  validateTalkInfo,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    await updateFile(TALKER_REL_PATH, id, body);
    const updated = await readById(TALKER_REL_PATH, id);
    return res.status(200).json(updated);
  },
);

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteById(TALKER_REL_PATH, id);
  return res.status(204).end();
});

module.exports = router;