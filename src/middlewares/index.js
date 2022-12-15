const validateLogin = require('./validateLogin');
const validateTalkInfo = require('./validateTalkInfo');
const validatePersonalInfo = require('./validatePersonalInfo');
const validateReqProps = require('./validateReqProps');
const validateToken = require('./validateToken');

module.exports = {
  validateLogin,
  validatePersonalInfo,
  validateReqProps,
  validateTalkInfo,
  validateToken,
};