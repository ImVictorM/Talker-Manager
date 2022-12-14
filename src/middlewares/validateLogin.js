const emailValidFormat = /\S+@\S+\.\S+/;
function validateLogin(req, res, next) {
  const propertiesRequired = ['email', 'password'];
  const fieldsAreValid = propertiesRequired.every((property) => property in req.body);
  if (!fieldsAreValid) {
    return res.status(400).json({ 
      message: `O campo "${'email' in req.body ? 'password' : 'email'}" é obrigatório`, 
    }); 
  }
  const emailIsValid = emailValidFormat.test(req.body.email);
  if (!emailIsValid) {
    return res.status(400).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    }); 
  }
  const passwordIsValid = req.body.password.length >= 6;
  if (!passwordIsValid) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
}

module.exports = validateLogin;