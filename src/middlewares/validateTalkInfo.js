function validateTalkInfo(req, res, next) {
  const { watchedAt, rate } = req.body.talk;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
  const dateIsValid = dateRegex.test(watchedAt);
  if (!dateIsValid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const rateIsValid = rate >= 1 && rate <= 5;
  if (!rateIsValid || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
}

module.exports = validateTalkInfo;