const express = require('express');
const { read } = require('../utils/fileSystem');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkers = await read('../talker.json');
  return res.status(200).json(talkers);
});

module.exports = router;