function validateReqProps(req, res, next) {
  const { body } = req;
  const bodyReqProps = ['name', 'age', 'talk'];
  const talkReqProps = ['watchedAt', 'rate'];
  const bodyIsValid = bodyReqProps.every((property) => property in body);
  if (!bodyIsValid) {
    const missingProperty = bodyReqProps.find((property) => !(property in body));
    return res.status(400).json({
      message: `O campo "${missingProperty}" é obrigatório`,
    });
  }
  const talkPropIsValid = talkReqProps.every((property) => property in body.talk);
  if (!talkPropIsValid) {
    const missingProperty = talkReqProps.find((property) => !(property in body.talk));
    return res.status(400).json({
      message: `O campo "${missingProperty}" é obrigatório`,
    });
  }
  return next();
}

module.exports = validateReqProps;