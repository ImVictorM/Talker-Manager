function validateToken(auth, res) {
  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (auth.length < 16 || typeof auth !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function validateTalker(req, res, _next) {
  const { authorization } = req.headers;
  validateToken(authorization, res);
}

module.exports = validateTalker;