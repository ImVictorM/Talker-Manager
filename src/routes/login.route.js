const express = require('express');
const { generateToken } = require('../utils/generateToken');
const { validateLogin } = require('../middlewares');

const router = express.Router();

router.post('/', validateLogin, (_req, res) => {
  const token = generateToken();
  return res.status(200).json({ token });
});

module.exports = router;
