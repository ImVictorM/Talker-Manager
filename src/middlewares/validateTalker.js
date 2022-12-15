function validateToken(auth, res) {
  if (!auth) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (auth.length < 16 || typeof auth !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

function validateProperties(props, obj, res) {
  const fieldsAreValid = props.every((property) => property in obj);
  if (!fieldsAreValid) {
    const missingProperty = props.find((property) => !(property in obj));
    return res.status(400).json({
      message: `O campo "${missingProperty}" é obrigatório`,
    });
  }
}

function validateTalk(talk, res) {
  const { watchedAt, rate } = talk;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  const dateIsValid = dateRegex.test(watchedAt);
  if (!dateIsValid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const rateIsValid = rate >= 1 && rate <= 5;
  if (!rateIsValid) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validateTalkerInfo(body, res) {
  const { name, age, talk } = body;
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  const MINIMUM_AGE = 18;
  if (age < MINIMUM_AGE) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  validateTalk(talk, res);
}

function validateTalker(req, res, next) {
  const { authorization } = req.headers;
  const { body } = req;
  validateToken(authorization, res);
  const bodyReqProps = ['name', 'age', 'talk'];
  const talkReqProps = ['watchedAt', 'rate'];
  validateProperties(bodyReqProps, body, res);
  if (body.talk) {
    validateProperties(talkReqProps, body.talk, res);
  }
  validateTalkerInfo(body, res);
  return next();
}

module.exports = validateTalker;