function validateToken(req, res, next) {
  const { authorization: auth } = req.headers;
  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (auth.length < 16 || typeof auth !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
}

module.exports = validateToken;