function validatePersonalInfo(req, res, next) {
  const { name, age } = req.body;
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  const MINIMUM_AGE = 18;
  if (age < MINIMUM_AGE) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
}

module.exports = validatePersonalInfo;